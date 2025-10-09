import { Outlet } from 'react-router-dom';
import { LocationHeader, MenuHeader } from '../components/Headers';
import FooterNav from './FooterNav';
import SearchInput from '@/components/SearchInput';

export default function Layout() {
  return (
    <>
      <div className="w-full sticky top-0 z-1000 bg-white py-2">
        <LocationHeader location="서울특별시 동작구 상도동" />
        <SearchInput className="bg-[#F3F3F3] px-[16px] py-[10px] rounded-3xl mx-6" />
      </div>
      <main className="px-6">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[401px] bg-white border-t border-gray-100 z-10">
        <FooterNav />
      </footer>
    </>
  );
}
