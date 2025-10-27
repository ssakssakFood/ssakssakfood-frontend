import { useSearchParams } from "react-router-dom";
import MenuCard from "@/components/MenuCard";
import { useSearchMenus } from "@/api/menu/menu";

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // API를 통한 검색
  const { data: searchResults, isLoading } = useSearchMenus({ keyword: query });
  const filteredMenus = searchResults || [];

  return (
    <div className="pt-4 pb-20">
      <h2 className="text-lg font-semibold mb-3">
        "{query}" 검색 결과 ({filteredMenus.length}개)
      </h2>

      {isLoading ? (
        <p className="text-gray-500 mt-10 text-center">로딩 중...</p>
      ) : filteredMenus.length > 0 ? (
        <div className="flex flex-col gap-[24px]">
          {filteredMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              id={menu.id}
              title={menu.name}
              storeName={menu.storeName}
              pickupTime={menu.deadline}
              originalPrice={menu.originalPrice}
              salePrice={menu.discountPrice}
              discountRate={menu.discountRate}
              stockCount={menu.surplusQuantity}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-10 text-center">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
