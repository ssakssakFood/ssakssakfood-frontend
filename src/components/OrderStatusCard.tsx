import BasicImg from "@/assets/images/basic.svg";

interface OrderStatusCardProps {
  menuName: string;
  storeName: string;
  menuImageUrl: string;
  foodQuantity: number;
  totalAmount: number;
  reservedAt: string;
  pickupTime: string;
  status: string;
}

//status가 "PENDING" 이면, "예약 확인 중"
//status가 "CONFIRMED"면 "예약 확정" -> *픽업시간을 꼭 지켜주세요 표시 추가
//status가 "CANCELLED"이면 "예약 취소됨" -> 배경색 #EDF1FF, 글자색 #496FF8로 바뀜.

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}.${day} (${dayOfWeek}) ${hours}:${minutes}`;
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "PENDING":
      return "예약 확인 중";
    case "CONFIRMED":
      return "예약 확정";
    case "COMPLETED":
      return "픽업 완료";
    case "CANCELLED":
      return "예약 취소됨";
    default:
      return status;
  }
};

const getStatusStyle = (status: string) => {
  if (status === "CANCELLED") {
    return "text-[#496FF8] bg-[#EDF1FF]";
  }
  return "text-[#FE7549] bg-[#FFF2ED]";
};

export default function OrderStatusCard({
  menuName,
  storeName,
  menuImageUrl,
  foodQuantity,
  totalAmount,
  reservedAt,
  pickupTime,
  status,
}: OrderStatusCardProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-[16px] font-semibold">
          {formatDateTime(reservedAt)}
        </div>
        <div
          className={`text-[14px] font-medium px-3 py-2 rounded-2xl ${getStatusStyle(status)}`}
        >
          {getStatusLabel(status)}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <img
          src={menuImageUrl || BasicImg}
          alt="메뉴 이미지"
          className="w-[88px] h-[88px] object-cover rounded-2xl"
        />
        <div className="flex flex-col gap-1">
          <div className="text-[18px] font-bold flex gap-2 items-center">
            {menuName}
            <span className="text-[14px] font-semibold text-[#7F7F7F]">
              {storeName}
            </span>
          </div>
          <div className="text-[14px] font-normal text-[#7F7F7F] flex gap-2 items-center">
            수량<span>{foodQuantity}</span>
          </div>
          <div className="text-[14px] font-normal text-[#7F7F7F] flex gap-2 items-center">
            결제금액<span>{totalAmount.toLocaleString()}원</span>
          </div>
        </div>
      </div>
      {status === "CONFIRMED" && (
        <div className="bg-[#FFF2ED] rounded-2xl p-4 flex flex-col gap-2 mt-3">
          <div className="text-[18px] font-bold flex gap-4">
            픽업시간 <span>{formatDateTime(pickupTime)}</span>
          </div>
          <div className="text-[12px] text-[#F30000] font-normal">
            * 픽업 시간을 꼭 지켜주세요.
          </div>
        </div>
      )}
      {status === "CANCELLED" && (
        <div className="bg-[#EDF1FF] rounded-2xl p-4 flex flex-col gap-2 mt-3">
          <div className="text-[18px] font-bold flex gap-4">
            취소 사유: <span>재고 없음</span>
          </div>
        </div>
      )}
    </div>
  );
}
