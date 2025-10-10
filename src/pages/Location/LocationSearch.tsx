import ChevronL from "@assets/icons/chevron-left.svg";
import { LocationField } from "../../components/Location/LocationField";
import SearchLocationBtn from "../../components/Location/SearchLocationBtn";
import { useNavigate } from "react-router-dom";
import LocationList from "../../components/Location/LocationListItem";
import Button from "../../components/Button";
import { useState } from "react";
//api연결
export default function LocationSearch() {
  const navigate = useNavigate();
  const data = [
    { roadAddress: "서울시 동작구 상도동", buildingName: "전선아집", id: 1 },
    { roadAddress: "서울시 동작구 상도동", buildingName: "전선아집", id: 2 },
    { roadAddress: "서울시 동작구 상도동", buildingName: "전선아집", id: 3 },
    { roadAddress: "서울시 동작구 상도동", buildingName: "전선아집", id: 4 },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleSelect = (id: number) => {
    setSelectedIndex((prev) => (prev === id ? null : id));
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
      <LocationField mode="fill-only" />
      <span className=" h-1 bg-grey-5 mb-4"></span>
      <SearchLocationBtn className="mb-4" />
      {/* 리스트 */}
      {data.map((item) => (
        <div onClick={() => handleSelect(item.id)}>
          <LocationList
            roadAddress={item.roadAddress}
            buildingName={item.buildingName}
            isSelected={selectedIndex === item.id}
          />
        </div>
      ))}
      <div className=" fixed  w-full max-w-[353px] flex justify-center bottom-6  z-50 ">
        <Button labelName="위치등록" />
      </div>
    </div>
  );
}
