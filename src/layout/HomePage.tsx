import { Outlet } from 'react-router-dom';
import { LocationHeader, MenuHeader } from '../components/Headers';
import FooterNav from './FooterNav';

export default function Layout() {
  return (
    <>
      <div className="w-full sticky top-0 z-10 bg-white">
        <LocationHeader location="서울특별시 동작구 상도동" />
      </div>
      <main className="">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[401px] bg-white border-t border-gray-100 z-10">
        <FooterNav />
      </footer>
    </>
  );
}
