import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SMarkerUrl from "@/assets/icons/start-marker.svg?url";
import EMarkerUrl from "@/assets/icons/end-marker.svg?url";

type LatLng = { lat: number; lng: number };

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  start?: LatLng;
  end?: LatLng;
  height?: number | string; // px 또는 %
  /** 보행 거리/시간을 필요하면 여기로 알려줌 (단위: m, sec) */
  onSummary?: (summary: { distance: number; time: number }) => void;
}

export default function RouteMap({
  start,
  end,
  height = 260,
  onSummary,
}: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  // Kakao 지도 인스턴스 생성
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

      const init = () => {
        const center = start || end || { lat: 37.5665, lng: 126.978 };
        mapRef.current = new kakao.maps.Map(mapEl.current!, {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level: 6,
        });
        setIsMapReady(true); // ✅ 지도 준비 완료
      };

      if (kakao.maps.load) kakao.maps.load(init);
      else init();
    });

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // 경로 그리기 (보행)
  useEffect(() => {
    const map = mapRef.current;
    if (!isMapReady) return;
    if (!map || !start || !end) return;

    const { kakao } = window;

    // 이전 오버레이/마커 정리
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const sPos = new kakao.maps.LatLng(start.lat, start.lng);
    const ePos = new kakao.maps.LatLng(end.lat, end.lng);

    const makeMarker = (position: any, url?: string) => {
      try {
        if (url) {
          const image = new kakao.maps.MarkerImage(
            url,
            new kakao.maps.Size(40, 40),
            { offset: new kakao.maps.Point(20, 20) }
          );
          return new kakao.maps.Marker({ map, position, image });
        }
        return new kakao.maps.Marker({ map, position });
      } catch {
        return new kakao.maps.Marker({ map, position });
      }
    };

    const sMarker = makeMarker(sPos, SMarkerUrl);
    const eMarker = makeMarker(ePos, EMarkerUrl);
    markersRef.current = [sMarker, eMarker];

    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(sPos);
    bounds.extend(ePos);

    const fetchWalkRoute = async (signal?: AbortSignal) => {
      const appKey = import.meta.env.VITE_APP_TMAP_KEY as string | undefined;
      if (!appKey) {
        console.warn("[RouteMap] VITE_APP_TMAP_KEY 가 설정되어 있지 않습니다.");
      }

      const url =
        "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json";
      const body = {
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startX: Number(start.lng),
        startY: Number(start.lat),
        endX: Number(end.lng),
        endY: Number(end.lat),
        startName: "출발지",
        endName: "도착지",
      };

      const { data } = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          appKey: appKey ?? "",
        },
        signal,
      });

      console.log("[RouteMap] Tmap response:", data);
      const features = data?.features ?? [];
      let totalDistance = 0;
      let totalTime = 0;
      for (const f of features) {
        const p = f?.properties;
        if (p?.totalDistance != null) totalDistance = p.totalDistance;
        if (p?.totalTime != null) totalTime = p.totalTime;
      }

      const lineCoords: Array<{ lat: number; lng: number }> = [];
      features
        .filter((f: any) => f.geometry?.type === "LineString")
        .forEach((f: any) => {
          (f.geometry.coordinates || []).forEach((c: [number, number]) => {
            lineCoords.push({ lng: c[0], lat: c[1] });
          });
        });

      return { lineCoords, totalDistance, totalTime };
    };

    const ac = new AbortController();

    (async () => {
      try {
        const { lineCoords, totalDistance, totalTime } = await fetchWalkRoute(
          ac.signal
        );

        onSummary?.({ distance: totalDistance, time: totalTime });

        const path =
          lineCoords.length > 1
            ? lineCoords.map((p) => new kakao.maps.LatLng(p.lat, p.lng))
            : [sPos, ePos]; // 폴백

        path.forEach((ll) => bounds.extend(ll));
        map.setBounds(bounds, 40); // ✅ padding 한 개만

        polylineRef.current = new kakao.maps.Polyline({
          map,
          path,
          strokeWeight: 6,
          strokeColor: "#FF6B00",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });
      } catch (e: any) {
        if (e?.name === "CanceledError" || e?.message === "canceled") return;
        // 실패 시 직선 표시 + 에러 로그
        polylineRef.current = new kakao.maps.Polyline({
          map,
          path: [sPos, ePos],
          strokeWeight: 6,
          strokeColor: "#FF6B00",
        });
        map.setBounds(bounds, 40);
        console.error("Tmap Pedestrian API error:", e);
      }
    })();

    return () => {
      ac.abort();
    };
  }, [isMapReady, start?.lat, start?.lng, end?.lat, end?.lng, onSummary]); // ✅ isMapReady 추가

  const styleHeight =
    typeof height === "number" ? `${height}px` : height || "260px";

  return (
    <div
      ref={mapEl}
      style={{
        width: "100%",
        height: styleHeight,
        minHeight: "200px",
        position: "relative",
      }}
    />
  );
}
