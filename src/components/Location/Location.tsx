import Dismiss from "@assets/icons/x-circle.svg?react";

interface LocationProps {
  editMode?: boolean;
  onClick?: () => void;
  roadAddress: string;
  buildingName: string;
}

export default function Location({
  editMode = false,
  roadAddress = "",
  buildingName = "",
}: LocationProps) {
  return (
    <div className=" p-4 flex items-center rounded-lg border border-grey-4 justify-between">
      <div className="body-r-16">
        <p>{roadAddress}</p>
        <p>{buildingName}</p>
      </div>
      {editMode && <Dismiss />}
    </div>
  );
}
