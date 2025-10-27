import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./layout/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TermPage from "./pages/login/TermPage";
import OnBoardingConfirmPage from "./pages/onBoarding/onBoardingConfirm";
import OnBoardingPage from "./pages/onBoarding/onBoarding";
import OnBoardingPassPage from "./pages/onBoarding/onBoardingPass";
import SearchResultPage from "./pages/SearchResult/SearchResultPage";
import NearByPage from "./pages/NearBy/NearByPage";
import LocationEdit from "./pages/Location/LocationEdit";
import LocationSearch from "./pages/Location/LocationSearch";
import LocationMap from "./pages/Location/LocationMap";
import PxLayout from "./layout/PxLayoyt";
import CategoryPage from "./pages/Category/CategoryPage";
import MenuDetailPage from "./pages/Menu/MenuDetailPage";
import OnboardingNumber from "@/pages/onBoarding/onBoardingNumber";
import OnBoardingCardPage from "@/pages/onBoarding/onBoardingCard";
import OnBoardingComplete from "@/pages/onBoarding/onBoardingComplete";
import StorePage from "./pages/Store/StorePage";
import ReservePage from "./pages/Reserve/ReservePage";
import OwnerInformation from "@/pages/onBoarding/onBoardingOwner";
import StoreInformation from "@/pages/onBoarding/onBoardingStore";
import AllfoodsPage from "./pages/ManagerHome/AllFoodsPage";
import AddFoodPage from "./pages/ManagerHome/AddFoodPage";
import AddfoodEditPage from "./pages/ManagerHome/AddFoodEditPage";
import AuthGuard from "@/components/AuthGuard";

// 비회원 접근을 막습니다.
const withAuthGuard = (Component: React.ComponentType) => {
  return (
    <AuthGuard>
      <Component />
    </AuthGuard>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchResultPage /> },
      { path: "nearby", element: withAuthGuard(NearByPage) },
      { path: "category/:slug", element: <CategoryPage /> },
    ],
  },
  {
    path: "/",
    element: <PxLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/term", element: <TermPage /> },
      { path: "*", element: <ErrorPage /> },
      // 온보딩
      { path: "/onBoarding", element: <OnBoardingPage /> },
      { path: "/onBoarding/confirm", element: <OnBoardingConfirmPage /> },
      { path: "/onBoarding/number", element: <OnboardingNumber /> },
      { path: "/onBoarding/pass", element: <OnBoardingPassPage /> },
      { path: "/onBoarding/card", element: <OnBoardingCardPage /> },
      { path: "/onBoarding/card", element: <OnBoardingCardPage /> },
      { path: "/onBoarding/complete", element: <OnBoardingComplete /> },
      { path: "/onBoarding/owner", element: <OwnerInformation /> },
      { path: "/onBoarding/store", element: <StoreInformation /> },
      //위치수정
      { path: "/location/edit", element: withAuthGuard(LocationEdit) },
      { path: "/location/search", element: withAuthGuard(LocationSearch) },
      { path: "/location/map", element: withAuthGuard(LocationMap) },
      //매장별 식품
      { path: "/store/:id", element: withAuthGuard(StorePage) },
      //예약
      { path: "/menu/:id/reserve", element: withAuthGuard(ReservePage) },
      { path: "/allfoods", element: withAuthGuard(AllfoodsPage) },
      { path: "/addfood", element: withAuthGuard(AddFoodPage) },
    ],
  },
  //메뉴 상세 페이지 (비회원도 접근 가능)
  { path: "menu/:id", element: <MenuDetailPage /> },
  { path: "/addfood/:id", element: withAuthGuard(AddfoodEditPage) },
]);

export default router;
