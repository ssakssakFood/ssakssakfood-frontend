import ChevronL from "@assets/icons/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import { LocationField } from "../../components/Location/LocationField";
import SearchLocationBtn from "../../components/Location/SearchLocationBtn";
import Location from "../../components/Location/Location";
import { useState } from "react";
import {
  useGetMyLocation,
  useGetMyPrimaryLocation,
} from "../../api/location/location";
import type { myLocationResponseDto } from "../../types/location";

export default function LocationEdit() {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>();

  // const location = useLocation();
  const handleClick = () => {
    navigate("/location/search");
  };

  const { data: primaryData, isLoading, isError } = useGetMyPrimaryLocation();
  console.log(primaryData);

  const {
    data: myLocationData,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = useGetMyLocation();
  console.log(myLocationData);

  const handleClik = () => {
    if (isEdit) {
      //수정일때

      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <header className="h-12 relative flex items-center self-stretch justify-center mb-8">
        <img
          src={ChevronL}
          alt="뒤로가기"
          className=" absolute left-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="subtitle-b-18 text-center">위치관리</p>
      </header>
      <div onClick={handleClick} className="cursor-pointer">
        <LocationField />
        <div className=" h-1 bg-grey-5 mb-4"></div>
        <SearchLocationBtn className="mb-6" />
      </div>
      <section className=" flex flex-col">
        <div className="flex flex-col gap-4 ">
          <p className="subtitle-b-16">선택된 위치</p>
          <div className="bg-sub1 body-r-16 rounded-lg p-4 mb-6">
            서울 동작구 상도동
          </div>
        </div>
        <div className="flex  items-center mb-4">
          <p className="subtitle-b-16 mr-auto">등록된 위치</p>
          <button
            className="py-1 px-3 rounded-s-sm bg-grey-5 body-r-14"
            onClick={handleClik}
          >
            {isEdit ? "수정" : "저장"}
          </button>
        </div>
        {myLocationData?.map((item: myLocationResponseDto) => {
          return (
            <Location
              roadAddress={item.jibunAddress}
              buildingName={item?.buildingName}
              editMode={!isEdit}
              userLocationId={Number(item?.userLocationId)}
            />
          );
        })}
      </section>
    </div>
  );
}
