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
        <p className="subtitle-b-16 mb-2">{buildingName}</p>
        <p className="body-r-14 text-grey-2">{roadAddress}</p>
      </div>
      {editMode && <Dismiss />}
    </div>
  );
}
