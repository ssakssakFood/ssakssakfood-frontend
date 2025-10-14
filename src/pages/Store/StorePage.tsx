import { useParams } from "react-router-dom";
import { MenuHeader } from "@/components/Headers";
import { MENUS } from "@/Mock/menudatas";
import StoreInfoCard from "@/components/StoreInfoCard";
import MenuCard from "@/components/MenuCard";

export default function StorePage() {
  const { id } = useParams<{ id: string }>();
  const menu = MENUS.find((m) => m.id === Number(id));
  if (!menu) return <p>매장을 찾을 수 없습니다.</p>;
  const otherMenus = MENUS.filter(
    (m) => m.storeName === menu.storeName && m.id !== menu.id
  );
  return (
    <div>
      <MenuHeader title="매장별 식품" />
      <div className="p-4 flex flex-col gap-[24px]">
        <StoreInfoCard name={menu?.storeName} address={menu?.location} />
        <div className="flex flex-col gap-[24px] ">
          {otherMenus.map((item) => (
            <MenuCard
              key={item.id}
              id={item.id}
              title={item.title}
              storeName={item.storeName}
              pickupTime={item.pickupTime}
              originalPrice={item.originalPrice}
              salePrice={item.salePrice}
              discountRate={item.discountRate}
              stockCount={item.stockCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
