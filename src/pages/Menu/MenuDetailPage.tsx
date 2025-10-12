import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { MENUS } from '@/Mock/menudatas';
import StockBadge from '@/components/StockBadge';
import StoreInfoCard from '@/components/StoreInfoCard';
import MenuCard from '@/components/MenuCard';
import Button from '@/components/Button';
import chevronLeft from '@/assets/floating-checvron-left.svg';
import OrderBottomSheet from './UI/OrderBottomSheet';

const CATEGORY_LABEL_MAP = {
  breads: '빵/디저트',
  packedmeal: '도시락/반찬',
  ingredients: '식자재',
  restaurant: '식당/조리',
  market: '시장',
  convenience: '편의점',
  sharing: '나눔',
  ssakssakstore: '착한가게',
} as const;

export default function MenuDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const menu = MENUS.find((m) => m.id === Number(id));
  if (!menu) return <p>메뉴를 찾을 수 없습니다.</p>;

  const categoryLabel =
    CATEGORY_LABEL_MAP[menu.slug as keyof typeof CATEGORY_LABEL_MAP];

  const otherMenus = MENUS.filter(
    (m) => m.storeName === menu.storeName && m.id !== menu.id
  );

  return (
    <div className="relative w-full max-w-[401px] mx-auto">
      <div className="absolute top-6 left-3 z-20">
        <img
          src={chevronLeft}
          alt="뒤로가기"
          className="cursor-pointer fixed"
        />
      </div>

      {/* ✅ 콘텐츠 */}
      <div>
        <div className="w-full h-[240px] bg-gray-400 text-center">
          이미지 자리
        </div>

        <div className="px-6 pb-[100px]">
          <div className="flex justify-between items-center mt-[24px]">
            <span className="text-[24px] font-bold">{menu.title}</span>
            <StockBadge count={menu.stockCount} />
          </div>

          <div className="flex justify-between items-center mt-[16px] my-[24px]">
            <div className="flex flex-col gap-[8px] text-[14px] text-[#7F7F7F] font-semibold">
              <p>
                카테고리{' '}
                <span className="font-[400] ml-[8px]">{categoryLabel}</span>
              </p>
              <p>
                픽업 가능시간{' '}
                <span className="font-[400] ml-[8px]">{menu.pickupTime}</span>
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-end text-[14px] text-[#A8A8A8] line-through">
                <span>{menu.originalPrice.toLocaleString()}</span>원
              </div>
              <div className="flex gap-[10px] items-center justify-end">
                <div className="text-[16px] font-semibold text-[#F30000]">
                  <span>{menu.discountRate}</span>%
                </div>
                <div className="text-[20px] font-bold">
                  <span>{menu.salePrice.toLocaleString()}</span>원
                </div>
              </div>
            </div>
          </div>

          <StoreInfoCard name={menu.storeName} address={menu.location} />

          {otherMenus.length > 0 && (
            <div className="mt-[32px] flex flex-col">
              <div className="text-[20px] font-bold mb-[16px]">
                가게의 다른 식품
              </div>
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
          )}
        </div>

        {/* ✅ 하단 고정 버튼 */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[401px] bg-white border-t border-gray-100 z-50">
          <div className="p-4">
            <Button
              className="w-full text-lg py-6 cursor-pointer"
              labelName="예약하기"
              disabled={menu.stockCount === 0}
              onClick={() => setIsSheetOpen(true)} // 🟢 버튼 클릭 시 시트 오픈
            />
          </div>
        </footer>

        {/* ✅ 주문 바텀시트 (드래그 가능, 외부 제어 가능) */}
        <OrderBottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
        />
      </div>
    </div>
  );
}
