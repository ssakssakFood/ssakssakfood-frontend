//Header Components
import locatoinImg from '@/assets/location.svg';
import chevronDownImg from '@/assets/chevron-down.svg';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

interface LocationHeaderProps {
  location?: string;
}

//Title 내용을 Props로 받아 화면에 따른 메뉴의 Header내용을 보여줍니다.
export function MenuHeader({ title }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header>
      <div className='flex items-center justify-center py-4 border-gray-200 bg-white sticky top-0 z-10"'>
        <img
          src="/icons/chevron-left.svg"
          alt="뒤로가기"
          className=" absolute left-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="text-[18px] font-bold">{title}</div>
      </div>
    </header>
  );
}

//홈 화면에서 현재 위치 or 설정 위치를 보여주는 Header
export function LocationHeader({ location }: LocationHeaderProps) {
  const navigate = useNavigate();
  return (
    <header>
      <div className='flex gap-[8px] items-center py-4 border-gray-200 bg-white sticky top-0 z-10"'>
        <img src={locatoinImg} alt="위치" className="cursor-pointer m-0" />
        <div className="text-[16px] font-bold">{location}</div>
        <img src={chevronDownImg} alt="위치" className="cursor-pointer m-0" />
      </div>
    </header>
  );
}
