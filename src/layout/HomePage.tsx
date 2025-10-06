import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    //헤더
    <main className="">
      <Outlet />
    </main>
    //footer
  );
}
