// src/pages/Home.tsx

import React from "react";

/**
 * 프로젝트의 메인 홈 페이지 컴포넌트
 */
const Home: React.FC = () => {
  return (
    <div>
      <nav className="flex space-x-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        헤더
      </nav>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">TEST!</h2>
      <p className="text-gray-600">TEST TEST.</p>
    </div>
  );
};

export default Home;
