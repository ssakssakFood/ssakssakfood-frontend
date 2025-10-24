//내 주변 페이지
import useGeolocation from "@/hooks/useGeolocation";
import Route from "@assets/icons/tabler_route.svg";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Marker from "@/assets/icons/map-marker.svg?url";
import SearchInput from "@/components/SearchInput";
import RoutesModal from "@/components/nearby/RoutesModal";
import { useGetNearby } from "@/api/nearby/nearby";

declare global {
  interface Window {
    kakao: any;
  }
}
export default function NearbyPage() {
  const { latitude, longitude, address, fullAdress, loading, error } =
    useGeolocation();

  const [ismodal, setIsModal] = useState(false);

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

  const { data } = useGetNearby();
  console.log(data);

  const handleModal = () => {
    setIsModal(true);
  };
  const onCloseModal = () => {
    setIsModal(false);
  };
  return (
    <div ref={mapRef} className="flex-1 relative min-h-dvh -mx-6 ">
      <div className="flex items-center mt-5">
        <SearchInput className="relative bg-white px-4 py-[10px] rounded-3xl mx-6 z-20 w-full mb-2" />
      </div>
      <div
        className="absolute flex rounded-4xl h-6 w-22 py-1 px-3 gap-2 z-20 mx-6"
        style={{ background: "var(--color-gradient-main1)" }}
        onClick={handleModal}
      >
        <img src={Route} alt="루트" />
        <p className="body-r-14 text-white">내 루트</p>
      </div>

      {/* 모달 */}
      {ismodal && <RoutesModal onCloseModal={onCloseModal} data={data} />}
    </div>
  );
}
