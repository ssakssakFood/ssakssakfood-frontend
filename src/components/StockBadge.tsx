//n개 남음 표시 뱃지 컴포넌트
interface StockBadgeProps {
  count: number;
}

export default function StockBadge({ count }: StockBadgeProps) {
  return (
    <>
      <div className="flex justify-center items-center w-[66px] h-[24px] px-[12px] py-[6px] bg-[linear-gradient(90deg,#FE7549_0%,#D7562D_100%)] rounded-[20px]">
        <div className="text-[12px] font-semibold text-white">
          {count}개 남음
        </div>
      </div>
    </>
  );
}
