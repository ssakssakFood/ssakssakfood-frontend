import { useEffect, useRef } from "react";
import axios from "axios";
import SMarker from "@/assets/icons/start-marker.svg";
import EMarker from "@/assets/icons/end-marker.svg";

type LatLng = { lat: number; lng: number };

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  start?: LatLng;
  end?: LatLng;
  waypoints?: LatLng[]; // 선택: 중간 경유지
  height?: number | string; // px 또는 %
}

export default function RouteMap({
  start,
  end,
  waypoints = [],
  height = 260,
}: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Kakao 지도 인스턴스 생성 (index.html에 SDK 이미 포함됨)
  useEffect(() => {
    let timer: number | null = null;

    const ensureKakaoReady = () =>
      new Promise<void>((resolve) => {
        const check = () => {
          if (window.kakao && window.kakao.maps) return resolve();
          timer = window.setTimeout(check, 50);
        };
        check();
      });

    ensureKakaoReady().then(() => {
      if (!mapEl.current) return;
      const { kakao } = window;
      const center = start || end || { lat: 37.5665, lng: 126.978 };
      mapRef.current = new kakao.maps.Map(mapEl.current, {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level: 6,
      });
    });

    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 경로 그리기
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !start || !end) return;
    const { kakao } = window;

    // 이전 오버레이/마커 정리
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // 마커
    const sPos = new kakao.maps.LatLng(start.lat, start.lng);
    const ePos = new kakao.maps.LatLng(end.lat, end.lng);
    const sMarker = new kakao.maps.Marker({
      map,
      position: sPos,
      image: new kakao.maps.MarkerImage(SMarker, new kakao.maps.Size(40, 40), {
        offset: new kakao.maps.Point(20, 20),
      }),
    });
    const eMarker = new kakao.maps.Marker({
      map,
      position: ePos,
      image: new kakao.maps.MarkerImage(EMarker, new kakao.maps.Size(40, 40), {
        offset: new kakao.maps.Point(20, 20),
      }),
    });
    markersRef.current = [sMarker, eMarker];

    // bounds
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(sPos);
    bounds.extend(ePos);
    waypoints.forEach((w) =>
      bounds.extend(new kakao.maps.LatLng(w.lat, w.lng))
    );

    // --- Kakao Mobility 다중 목적지 Directions (직접 호출) ---
    const fetchDirections = async () => {
      const destinations = [
        { key: "0", x: end.lng, y: end.lat },
        ...waypoints.map((w, i) => ({
          key: String(i + 1),
          x: w.lng,
          y: w.lat,
        })),
      ];

      const { data } = await axios.post(
        "https://apis-navi.kakaomobility.com/v1/destinations/directions",
        {
          origin: { x: start.lng, y: start.lat },
          destinations,
          // 필요 시 옵션 추가:
          // priority: "TIME",       // "TIME" | "DISTANCE" (기본: TIME)
          // avoid: ["motorway"],    // ["ferries","toll","motorway","schoolzone","uturn"]
          // roadevent: 0,           // 0|1|2
          radius: 5000,
          // radius: 5000,           // 0~10000(m)
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_MAP_KEY}`,
          },
        }
      );

      return data;
    };

    (async () => {
      try {
        const data = await fetchDirections();

        // 상세 geometry가 있는 경우
        const sections = data?.routes?.[0]?.sections ?? [];
        console.log(data);
        let pathLL: any[] = [];

        if (sections.length) {
          const vertexPairs: { lat: number; lng: number }[] = [];
          sections.forEach((section: any) => {
            (section.roads || []).forEach((road: any) => {
              const v = road.vertexes || [];
              for (let i = 0; i < v.length; i += 2) {
                vertexPairs.push({ lng: v[i], lat: v[i + 1] });
              }
            });
          });

          pathLL =
            vertexPairs.length > 1
              ? vertexPairs.map((p) => new kakao.maps.LatLng(p.lat, p.lng))
              : [sPos, ePos];
        } else {
          // 요약만 오는 응답(문서 샘플 형태) → 직선으로 폴백
          pathLL = [sPos, ePos];
        }

        // bounds & draw
        pathLL.forEach((ll) => bounds.extend(ll));
        map.setBounds(bounds, 40, 40, 40, 40);

        polylineRef.current = new kakao.maps.Polyline({
          map,
          path: pathLL,
          strokeWeight: 4,
          strokeColor: "#FF6B00",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });
      } catch (e) {
        // 실패 시 직선 표시
        polylineRef.current = new kakao.maps.Polyline({
          map,
          path: [sPos, ePos],
          strokeWeight: 4,
          strokeColor: "#FF6B00",
        });
        map.setBounds(bounds, 40, 40, 40, 40);
        console.error("Kakao Mobility API error:", e);
      }
    })();
  }, [start?.lat, start?.lng, end?.lat, end?.lng, waypoints]);

  return <div ref={mapEl} style={{ width: "100%", height }} />;
}
