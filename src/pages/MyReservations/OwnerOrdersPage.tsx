import OwnerOrderStatusCard from "@/components/OwnerOrderStatusCard";
import ChevronDown from '@/assets/icons/chevron-down.svg';

export default function OwnerOrdersPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-bold my-6">주문내역</h1>
        <div className="flex gap-1 border border-[#DFDFDF] rounded-2xl px-2 py-1 cursor-pointer">10.30(목) <img src={ChevronDown} alt="날짜"/></div>
      </div>
      <OwnerOrderStatusCard />
    </div>
  );
}
