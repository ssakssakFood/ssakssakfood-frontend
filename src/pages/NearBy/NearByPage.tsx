//내 주변 페이지
import useGeolocation from "@/hooks/useGeolocation";
import Route from "@assets/icons/tabler_route.svg";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Marker from "@/assets/icons/map-marker.svg?url";

declare global {
  interface Window {
    kakao: any;
  }
}
export default function NearByPage() {
  const { latitude, longitude, address, fullAdress, loading, error } =
    useGeolocation();
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakao = window.kakao;
    if (loading || error) return;
    if (!mapRef.current || !kakao || !latitude || !longitude) return;

    kakao.maps.load(() => {
      const centerPos = new kakao.maps.LatLng(latitude, longitude);
      const mapOption = {
        center: centerPos,
        level: 2,
        draggable: true,
        scrollwheel: true,
      };

      const map = new kakao.maps.Map(mapRef.current, mapOption);

      // 마커
      new kakao.maps.Marker({
        position: centerPos,
        map,
        image: new kakao.maps.MarkerImage(Marker, new kakao.maps.Size(40, 40), {
          offset: new kakao.maps.Point(20, 20),
        }),
      });
    });
  }, [loading, error, latitude, longitude]);

  return (
    <div ref={mapRef} className="flex-1 relative min-h-dvh -mx-6">
      <div
        className="flex rounded-4xl h-6 w-22 py-1 px-3 gap-2"
        style={{ background: "var(--color-gradient-main1)" }}
      >
        <img src={Route} alt="루트" />
        <p className="body-r-14 text-white">내 루트</p>
      </div>
    </div>
  );
}
