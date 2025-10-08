import { useState } from 'react';
import home from '@/assets/home-line.svg';
import homeActive from '@/assets/home-line-active.svg';
import location from '@/assets/location-nav.svg';
import locationActive from '@/assets/location-active.svg';
import receipt from '@/assets/receipt.svg';
import receiptActive from '@/assets/receipt-active.svg';
import mypage from '@/assets/user.svg';
import mypageActive from '@/assets/user-active.svg';

export default function FooterNav() {
  const [activeTab, setActiveTab] = useState<'home' | 'nearby' | 'orders' | 'mypage'>('home');

  const navItems = [
    { id: 'home', label: '홈', icon: home, activeIcon: homeActive },
    { id: 'nearby', label: '내 주변', icon: location, activeIcon: locationActive },
    { id: 'orders', label: '주문 내역', icon: receipt, activeIcon: receiptActive },
    { id: 'mypage', label: '마이페이지', icon: mypage, activeIcon: mypageActive },
  ] as const;

  return (
    <nav className="w-full bg-white border-t border-[#DFDFDF] z-50">
      <div className="flex justify-center gap-[42px] py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center text-[12px] font-medium text-[#7F7F7F] cursor-pointer"
          >
            <img
              src={activeTab === item.id ? item.activeIcon : item.icon}
              alt={item.label}
              className="w-6 h-6 mb-1"
            />
            <span className={activeTab === item.id ? 'text-[#FE7549] font-semibold' : ''}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
