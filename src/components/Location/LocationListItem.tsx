import ChevronR from "@assets/icons/chevron-right.svg?react";

interface LocationListProps {
  roadAddress: string;
  buildingName: string;
  //   onClick: () => void;
  isSelected: boolean;
}
export default function LocationList({
  roadAddress,
  buildingName,
  isSelected = false,
}: LocationListProps) {
  return (
    <div
      className={`px-4 py-6 rounded-lg ${isSelected ? "bg-sub1" : "bg-white"} `}
    >
      <p className="">{roadAddress}</p>
      <p className="">{buildingName}</p>
      <div className="flex justify-end">
        <p className="body-r-14 text-grey-2 mr-1">지도에서 보기</p>
        <ChevronR />
      </div>
    </div>
  );
}
