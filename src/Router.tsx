import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Home from "./Home";
import Layout from "./layout/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TermPage from "./pages/login/TermPage";
import OnBoardingConfirmPage from "./pages/onBoarding/onBoardingConfirm";
import OnBoardingPage from "./pages/onBoarding/onBoarding";
import OnBoardingPassPage from "./pages/onBoarding/onBoardingPass";
import SearchResultPage from "./pages/SearchResult/SearchResultPage";
import NearByPage from "./pages/NearBy/NearByPage";
import CategoryPage from './pages/Category/CategoryPage';
import MenuDetailPage from './pages/Menu/MenuDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <SearchResultPage /> },
      { path: "nearby", element: <NearByPage /> },
      { path: "category/:slug", element: <CategoryPage /> },
    ],
  },
  //메뉴 상세 페이지
  { path: "menu/:id", element: <MenuDetailPage /> },

  { path: "/login", element: <LoginPage /> },
  { path: "/term", element: <TermPage /> },
  { path: "*", element: <ErrorPage /> },
  // 온보딩
  { path: "/onBoarding", element: <OnBoardingPage /> },
  { path: "/onBoardingConfirm", element: <OnBoardingConfirmPage /> },
  { path: "/onBoardingPassPage", element: <OnBoardingPassPage /> },
]);

export default router;
