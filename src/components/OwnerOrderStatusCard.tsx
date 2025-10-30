import BasicImg from "@/assets/images/basic.svg";
import Button from "./Button";

export default function OwnerOrderStatusCard() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="text-[16px] font-normal text-[#7F7F7F]">10.07(화) 13:00</div>
        <div className="text-[20px] font-bold flex gap-2 items-center">
          싹싹푸드님
          <span className="text-[14px] font-normal">010-****-1111</span>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-4">
        <img
          src={BasicImg}
          alt="메뉴 이미지"
          className="w-[72px] h-[72px] object-cover rounded-2xl"
        />
        <div className="flex flex-col gap-1">
          <div className="text-[18px] font-bold flex gap-2 items-center">
            메뉴명
          </div>
          <div className="text-[14px] font-normal text-[#7F7F7F] flex gap-2 items-center">
            결제금액<span>5000원</span>
          </div>
        </div>
      </div>
      <div className="bg-[#FFF2ED] rounded-2xl p-4 flex flex-col gap-2 mt-3">
        <div className="text-[18px] font-bold flex gap-4">
          수량 <span className="text-[#FE7549]">1개</span>
        </div>
        <div className="text-[18px] font-bold flex gap-4">
            픽업시간 <span className="text-[#FE7549]">10.07 (화) 13:00</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button labelName="예약 취소" className="flex-1 cursor-pointer" disabled={false} variant="secondary" />
        <Button labelName="예약 확정" className="flex-[2] cursor-pointer" disabled={false} />
      </div>
    </div>
  );
}
