import { useEffect, useState } from "react";
import { getMemberType, MemberType } from "@/utils/getUserInfo";
import ManagerMyPage from "@/pages/ManagerMyPage/ManagerMypage";
import UserMyPage from "@/pages/mypage/UserMyPage";

/**
 * memberType에 따라 다른 홈 화면을 렌더링하는 컴포넌트
 * - 비로그인 또는 USER: Home 컴포넌트
 * - OWNER: ManagerHome 컴포넌트
 */
const RoleMyPage = () => {
  const [memberType, setMemberType] = useState<MemberType | null>(null);

  useEffect(() => {
    const type = getMemberType();
    setMemberType(type);
  }, []);

  // OWNER인 경우 ManagerHome 렌더링
  if (memberType === "OWNER") {
    return <ManagerMyPage />;
  }
  // 비로그인 또는 USER인 경우 Home 렌더링
  return <UserMyPage />;
};

export default RoleMyPage;
