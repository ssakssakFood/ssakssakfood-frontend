import { Outlet } from 'react-router-dom';
import { LocationHeader, MenuHeader } from '../components/Headers';

export default function Layout() {
  return (
    <>
      <LocationHeader location='서울특별시 동작구 상도동' />
      <main className="">
        <Outlet />
      </main>
    </>
  );
}
