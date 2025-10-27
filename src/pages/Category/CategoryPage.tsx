import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MenuCard from "@/components/MenuCard";
import { CATEGORY } from "@/constants/Category";
import type { CategorySlugType } from "@/constants/Category";
import CategoryBadge from "@/components/CategoryBadge";
import { useSearchMenus } from "@/api/menu/menu";
import type { CategoryType } from "@/types/menu";
import FooterNav from "@/layout/FooterNav";

//category/:slug 페이지 입니다.
//각 선택된 카테고리의 메뉴 리스트를 보여줍니다.

// slug를 API CategoryType으로 변환하는 매핑
const SLUG_TO_CATEGORY: Record<CategorySlugType, CategoryType> = {
  breads: "빵/디저트",
  packedmeal: "도시락/반찬",
  ingredients: "식자재",
  restaurant: "식당/조리",
  market: "시장",
  convenience: "편의점",
  sharing: "나눔",
  ssakssakstore: "착한가게",
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: CategorySlugType }>();
  const [selectedSlug, setSelectedSlug] = useState<CategorySlugType | "all">(
    slug ?? "all",
  );
  const badgeScrollRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<Record<string, HTMLButtonElement>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const currentBadge = badgeRefs.current[selectedSlug];
    if (currentBadge && badgeScrollRef.current) {
      currentBadge.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [selectedSlug]);

  useEffect(() => {
    if (menuListRef.current) {
      menuListRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [selectedSlug]);

  // API를 통한 카테고리별 검색
  // "전체" 선택 시 category를 빈 값으로 전달하면 전체 메뉴 리스트 반환
  const category: CategoryType | undefined =
    selectedSlug !== "all" ? SLUG_TO_CATEGORY[selectedSlug] : undefined;

  // 빈 객체를 전달하면 전체 메뉴 검색
  const { data: searchResults, isLoading } = useSearchMenus(
    selectedSlug === "all" ? {} : { category }
  );
  const filteredMenus = searchResults || [];

  // 디버깅용 콘솔 로그
  console.log("===== CategoryPage Debug =====");
  console.log("selectedSlug:", selectedSlug);
  console.log("category:", category);
  console.log("searchResults:", searchResults);
  console.log("isLoading:", isLoading);
  console.log("filteredMenus 개수:", filteredMenus.length);
  console.log("============================");

  return (
    <div className="flex flex-col gap-6 mt-4 mb-20">
      {/* 카테고리 뱃지 목록 */}
      <div
        ref={badgeScrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide select-none overscroll-x-none"
      >
        <CategoryBadge
          ref={(el) => {
            if (el) badgeRefs.current["all"] = el;
          }}
          label="전체"
          active={selectedSlug === "all"}
          onClick={() => setSelectedSlug("all")}
        />
        {CATEGORY.map((category) => (
          <CategoryBadge
            key={category.slug}
            ref={(el) => {
              if (el) badgeRefs.current[category.slug] = el;
            }}
            label={category.label}
            active={selectedSlug === category.slug}
            onClick={() => setSelectedSlug(category.slug)}
          />
        ))}
      </div>

      {/* 메뉴 목록 컨테이너 */}
      {isLoading ? (
        <p className="text-gray-500 text-sm mt-10 text-center">로딩 중...</p>
      ) : filteredMenus.length > 0 ? (
        // ⭐️ Ref 추가: 메뉴 목록 컨테이너에 menuListRef 연결
        <div ref={menuListRef} className="flex flex-col gap-6 mt-4">
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
        <p className="text-gray-500 text-sm mt-10 text-center">
          현재 등록된 상품이 없습니다.
        </p>
      )}

      <footer className="fixed bottom-0 left-0 right-0 w-full max-w-[401px] bg-white border-t border-gray-100 z-10 mx-auto">
        <FooterNav />
      </footer>
    </div>
  );
}
