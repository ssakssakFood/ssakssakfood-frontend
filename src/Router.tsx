// src/Router.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

// 페이지 컴포넌트 임포트

/**
 * 애플리케이션의 모든 라우팅 경로를 정의하는 컴포넌트
 */
const Router: React.FC = () => {
  return (
    <Routes>
      {/* 홈 페이지 */}
      <Route path="/" element={<Home />} />

      {/* 404 페이지 */}
      <Route
        path="*"
        element={
          <div className="p-4 text-center">
            <h1 className="text-4xl font-bold text-red-500">404</h1>
            <p className="text-gray-600 mt-2">페이지를 찾을 수 없습니다.</p>
          </div>
        }
      />
    </Routes>
  );
};

export default Router;
