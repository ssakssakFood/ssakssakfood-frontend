import InputField2 from "@/components/InputField2";
import PageHeader from "@/components/PageHeader";
import Switch from "@/assets/icons/switch.svg";
import BDot from "@/assets/icons/blue-dot.svg";
import RDot from "@/assets/icons/red-dot.svg";
import Button from "@/components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useNearbyState } from "@/store/useRouteStore";
import RouteMap from "@/pages/NearBy/NearbyMap";
import { useDetailRoute, usePutRoute } from "@/api/nearby/nearby";
import { useState } from "react";
import { useNearbyUiState } from "@/store/useNearbyStore";

type LatLng = { lat: number; lng: number };
export default function NearbyEdit() {
  const navigate = useNavigate();
  const {
    // start,
    // startJibunAddress,
    // end,
    // endJibunAddress,
    setTemp,
    // routeName,
    reset,
  } = useNearbyState();
  const {
    routeName,
    start: startUi,
    end: endUi,
    startJibunAddress,
    endJibunAddress,
  } = useNearbyUiState();
  console.log(startUi);

  console.log(endJibunAddress, startJibunAddress);

  const [routeValue, setRouteValue] = useState(routeName || "");
  const [polyline, setPolyline] = useState<LatLng[]>([]);

  //   console.log(start, startJibunAddress, end, endJibunAddress);
  const parmas = useParams();
  const routeId = Number(parmas.routeId);
  const putRoute = usePutRoute(routeId);

  const { data } = useDetailRoute(routeId);
  console.log(data);

  const handleEditRoute = () => {
    putRoute.mutate({
      routeName: routeValue,
      start: {
        lat: Number(startUi?.lat),
        lng: Number(startUi?.lng),
      },

      end: {
        lat: Number(endUi?.lat),
        lng: Number(endUi?.lng),
      },
      polyline,
    });
    navigate("/nearby");
  };

  const isValid = Boolean(routeValue && startJibunAddress && endJibunAddress);
  // console.log(isValid);

  return (
    <div className="flex flex-col min-h-dvh">
      <PageHeader title="루트 수정" />
      <div className="my-6">
        <p className="mb-4 subtitle-b-16">루트 이름</p>
        <InputField2
          placeholder="루트 이름 입력"
          value={routeValue || data?.routeName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRouteValue(e.target.value);
            setTemp({ routeName: e.target.value });
          }}
        />
      </div>

      <section className="flex-1">
        {/* 인풋 */}
        <div className="mb-4">
          <p className="mb-4 subtitle-b-16">루트 설정</p>
          {/* 인풋필드 */}
          <div className="p-4 flex gap-4 bg-grey-5 rounded-xl">
            <img src={Switch} alt="출발지 도착지" />
            <div className="flex flex-col w-full">
              <div
                className="flex gap-2 border-b border-b-grey-4 pb-4 cursor-pointer"
                onClick={() =>
                  navigate("/location/search", {
                    state: { state: "nearbyStartEdit", routeId },
                  })
                }
              >
                <img src={RDot} alt="출발지" />
                <p
                  className={`body-r-14 ${startJibunAddress ? "text-black" : "text-grey-3"}`}
                >
                  {startJibunAddress || "출발지입력"}
                </p>
              </div>
              <div
                className="flex gap-2 pt-4 cursor-pointer"
                onClick={() =>
                  navigate("/location/search", {
                    state: { state: "nearbyEndEdit", routeId },
                  })
                }
              >
                <img src={BDot} alt="도착지" />
                <p
                  className={`body-r-14 ${endJibunAddress ? "text-black" : "text-grey-3"}`}
                >
                  {endJibunAddress || "도착지입력"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 지도 */}

        <RouteMap
          start={startUi ?? data?.start}
          end={endUi ?? data?.end}
          height={260}
          onPolylineReady={setPolyline}
        />
      </section>

      <Button
        labelName="루트 수정하기"
        className="mb-8"
        onClick={handleEditRoute}
        disabled={!isValid}
      />
    </div>
  );
}
