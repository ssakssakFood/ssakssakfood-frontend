import { useState } from "react"; // useEffect 임포트 제거
import { getMemberType, MemberType } from "@/utils/getUserInfo";
import Home from "@/Home";
import ManagerHome from "@/pages/ManagerHome/ManagerHome";

/**
 * memberType에 따라 다른 홈 화면을 렌더링하는 컴포넌트
 * - 비로그인 또는 USER: Home 컴포넌트
 * - OWNER: ManagerHome 컴포넌트
 */
const HomePage = () => {
  // useState의 초기값으로 getMemberType()을 직접 호출합니다.
  const [memberType, setMemberType] = useState<MemberType | null>(
    getMemberType()
  );

  // useEffect(() => {
  //   const type = getMemberType();
  //   setMemberType(type);
  // }, []); // <-- 이 부분은 더 이상 필요 없으므로 삭제합니다.

  // OWNER인 경우 ManagerHome 렌더링
  if (memberType === "OWNER") {
    return <ManagerHome />;
  }

  // 비로그인 또는 USER인 경우 Home 렌더링
  return <Home />;
};

export default HomePage;
