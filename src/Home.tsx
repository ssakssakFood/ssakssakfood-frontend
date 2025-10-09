// src/pages/Home.tsx

import React from 'react';
import SearchInput from './components/SearchInput';
import { CATEGORY } from './constants/Category'; // CATEGORY 배열 경로 맞춰서 import
import MenuCard from './components/MenuCard';
import { MenuHeader } from './components/Headers';
import StockBadge from './components/StockBadge';
import Carousel from './components/Carousel';

/**
 * 프로젝트의 메인 홈 페이지 컴포넌트
 */
const Home: React.FC = () => {
  return (
    <div>

      {/* <div className="relative mt-[16px] left-1/2 -translate-x-1/2 w-auto max-w-[401px] bg-[#D9D9D9] h-[160px] text-center">
        <Carousel />
      </div> */}
      <div className="mx-[-24px]">
        <Carousel />
      </div>

      <div className="grid grid-cols-4 gap-x-[16px] gap-y-[16px] mt-[16px]">
        {CATEGORY.map((category) => (
          <div key={category.slug} className="w-[72px]">
            <div className="w-[72px] h-[72px] bg-[#D9D9D9]"></div>
            <span className="text-[14px] font-[500] flex justify-center mt-[8px]">
              {category.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[24px] mt-[32px] mb-[84px]">
        <span className="text-[20px] font-bold">할인율 높은 음식</span>
        <div className="flex flex-col gap-[24px]">
          <MenuCard
            title="식빵"
            storeName="파리바게트"
            pickupTime="10:00 ~ 12:00"
            originalPrice={9000}
            salePrice={7000}
            discountRate={20}
            stockCount={5}
          />
          <MenuCard
            title="식빵"
            storeName="파리바게트"
            pickupTime="10:00 ~ 12:00"
            originalPrice={9000}
            salePrice={7000}
            discountRate={20}
            stockCount={5}
          />
          <MenuCard
            title="식빵"
            storeName="파리바게트"
            pickupTime="10:00 ~ 12:00"
            originalPrice={9000}
            salePrice={7000}
            discountRate={20}
            stockCount={5}
          />
          <MenuCard
            title="식빵"
            storeName="파리바게트"
            pickupTime="10:00 ~ 12:00"
            originalPrice={9000}
            salePrice={7000}
            discountRate={20}
            stockCount={5}
          />
          <MenuCard
            title="식빵"
            storeName="파리바게트"
            pickupTime="10:00 ~ 12:00"
            originalPrice={9000}
            salePrice={7000}
            discountRate={20}
            stockCount={5}
          />
          <MenuCard
            title="식빵"
            storeName="파리바게트"
            pickupTime="10:00 ~ 12:00"
            originalPrice={9000}
            salePrice={7000}
            discountRate={20}
            stockCount={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
