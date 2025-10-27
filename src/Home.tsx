// Home.tsx
import React from "react";
import { CATEGORY } from "./constants/Category";
import MenuCard from "./components/MenuCard";
import Carousel from "./components/Carousel";
import { useNavigate } from "react-router-dom";
import FooterNav from "./layout/FooterNav";
import { useGetHomeMenus } from "@/api/menu/menu";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // 할인율 높은 음식 리스트 조회
  const { data: homeMenus, isLoading } = useGetHomeMenus();

  // 디버깅용 콘솔 로그
  console.log("===== Home Menus Debug =====");
  console.log("homeMenus:", homeMenus);
  console.log("isLoading:", isLoading);
  console.log("homeMenus 개수:", homeMenus?.length);
  console.log("==========================");

  return (
    <div className="relative">
      {/* Carousel - 부모의 padding을 무시하고 전체 너비 사용 */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div className="max-w-[401px] mx-auto">
          <Carousel />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-[16px] gap-y-[16px] mt-[16px]">
        {CATEGORY.map((category) => (
          <div
            key={category.slug}
            onClick={() => navigate(`/category/${category.slug}`)}
            className="w-[72px] cursor-pointer"
          >
            <div className="w-[72px] h-[72px] flex items-center justify-center">
              <img
                src={category.icon}
                alt={category.label}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[14px] font-[500] flex justify-center mt-[8px]">
              {category.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[24px] mt-[32px] mb-[84px]">
        <span className="text-[20px] font-bold">할인율 높은 음식</span>
        <div className="flex flex-col gap-[24px]">
          {isLoading ? (
            <div className="text-center text-gray-500 py-8">
              로딩 중...
            </div>
          ) : !homeMenus || homeMenus.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              아직 근처에 등록된 식품이 없어요
            </div>
          ) : (
            homeMenus.map((menu) => (
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
            ))
          )}
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 w-full max-w-[401px] bg-white border-t border-gray-100 z-10 mx-auto">
        <FooterNav />
      </footer>
    </div>
  );
};

export default Home;
