import { useParams } from "react-router-dom";
import { MenuHeader } from "@/components/Headers";
import { MENUS } from "@/Mock/menudatas";
import { STORES } from "@/Mock/storedatas";
import StoreInfoCard from "@/components/StoreInfoCard";
import MenuCard from "@/components/MenuCard";

export default function StorePage() {
  const { id } = useParams<{ id: string }>();
  const store = STORES.find((s) => s.id === Number(id));

  if (!store) return <p>매장을 찾을 수 없습니다.</p>;

  // ✅ 해당 매장의 메뉴 목록 불러오기
  const storeMenus = MENUS.filter((m) => m.storeId === store.id);

  return (
    <div>
      <MenuHeader title="매장별 식품" />
      <div className="flex flex-col gap-[24px]">
        <StoreInfoCard id={store.id} name={store.name} address={store.address} />

        <div className="flex flex-col gap-[24px]">
          {storeMenus.length > 0 ? (
            storeMenus.map((item) => (
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
            ))
          ) : (
            <p>등록된 메뉴가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
