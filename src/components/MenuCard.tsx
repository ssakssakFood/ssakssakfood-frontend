import mockImg from '@/assets/icons/bread.svg';
import StockBadge from './StockBadge';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
interface MenuCardProps {
  id: number;
  title: string;
  storeName: string;
  pickupTime: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  stockCount: number;
}

//일반 홈 화면에서 보이는 메뉴 카드 컴포넌트입니다.
export default function MenuCard({
  id,
  title,
  storeName,
  pickupTime,
  originalPrice,
  salePrice,
  discountRate,
  stockCount,
}: MenuCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="flex gap-[18px] cursor-pointer" onClick={handleClick}>
      <div className="relative w-[100px] h-[100px] flex-shrink-0">
        <img
          src={mockImg}
          alt="임시"
          className="w-full h-full object-cover rounded-[8px]"
        />
        <div className="absolute top-[8px] left-[8px]">
          <StockBadge count={stockCount} />
        </div>
      </div>
      <div className="w-full">
        <div>
          <div className="flex items-center gap-[10px]">
            <span className="text-[18px] font-bold">{title}</span>
            <span className="text-[14px] font-[600] text-[#7F7F7F]">
              {storeName}
            </span>
          </div>
          <div className="flex gap-[10px] text-[14px] font-[600] text-[#7F7F7F]">
            픽업 가능시간
            <span>{pickupTime}</span>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <div className="flex flex-col">
            <div className="flex justify-end text-[14px] text-[#A8A8A8] line-through">
              <span>{originalPrice.toLocaleString()}</span>원
            </div>
            <div className="flex gap-[10px] items-center justify-end">
              <div className="text-[16px] font-semibold text-[#F30000]">
                <span>{discountRate}</span>%
              </div>
              <div className="text-[20px] font-bold">
                <span>{salePrice.toLocaleString()}</span>원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//사장님 홈 화면에서 보이는 메뉴 이미지 카드 컴포넌트입니다.
export function MenuImgCard({
  originalPrice,
  salePrice,
  name,
}: {
  originalPrice: number;
  salePrice: number;
  name: string;
}) {
  return (
    <div className="relative w-[128px] h-[128px] flex-shrink-0">
      <img
        src={mockImg}
        alt="임시"
        className="w-full h-full object-cover rounded-[8px]"
      />
      <div
        className="absolute inset-0 rounded-[8px] z-10 
                   bg-gradient-to-t from-black/60 via-black/0 to-transparent"
      ></div>
      <div className="absolute left-[10px] bottom-[30px] text-[16px] text-white font-bold z-20">
        {name}
      </div>
      <div className="flex items-center  gap-2 absolute left-[10px] bottom-[12px] text-white z-20">
        <div className="line-through text-[12px]">
          {originalPrice.toLocaleString()}원
        </div>
        <div className="font-bold text-[14px]">
          {salePrice.toLocaleString()}원
        </div>
      </div>
      <div className="absolute top-[8px] left-[8px]"></div>
    </div>
  );
}

export function MenuAddCard({
  name,
  originalPrice,
  salePrice,
}: {
  name: string;
  originalPrice: number;
  salePrice: number;
}) {
  return (
    <div className='flex justify-between items-end'>
      <div className="flex gap-4 items-center">
        <img src={mockImg} alt="식품 추가 아이콘" width={80} />
        <div className="flex flex-col gap-2">
          <div className="text-18px] font-bold">{name}</div>
          <div className="flex flex-col text-[14px] font-normal text-[#7F7F7F]">
            <div>
              원가{' '}
              <span className="font-semibold">
                {originalPrice.toLocaleString()}원
              </span>
            </div>
            <div>
              판매가{' '}
              <span className="font-semibold">
                {salePrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[74px] h-[30px] text-white text-[14px] font-semibold flex rounded-lg items-center justify-center bg-main1 px-[11px] py-[7px] cursor-pointer">
        판매 시작
      </div>
    </div>
  );
}
