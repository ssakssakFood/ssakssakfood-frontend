import { RouterProvider } from "react-router-dom";
import router from "./Router";

function App() {
  return (
    <div className="min-h-dvh bg-gray-50 flex justify-center">
      {/* 2. 메인 웹 앱 컨테이너:
          - max-w-[401px]: 최대 너비를 401px로 제한합니다. (Tailwind Arbitrary Value)
          - 웹앱 프로젝트 이므로, iphone 16pro 기준 401px로 고정
      */}
      <div className="w-full max-w-[401px] bg-white shadow-2xl px-6">
        <main className="min-h-[calc(100vh-60px)] ">
          <RouterProvider router={router} />
        </main>
      </div>
    </div>
  );
}

export default App;
