import { useState } from "react";
import Button from "../../components/Button";
import InputField2 from "../../components/InputField2";
import { ProgressBar } from "../../components/ProgressBar";
import { useNavigate } from "react-router-dom";

export default function OnBoardingConfirmPage() {
  //일단 상태로 관리
  const navigate = useNavigate();
  const [emailAuth, setEmailAuth] = useState<boolean>(false);

  const handleNext = () => {
    setEmailAuth(true);
    navigate("/onBoardingPassPage");
  };
  return (
    <div className="w-full flex flex-col min-h-dvh ">
      <section className="flex-1 ">
        <header className="h-12 relative flex items-center self-stretch justify-center mb-8">
          <img
            src="/icons/chevron-left.svg"
            alt="뒤로가기"
            className=" absolute left-0 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="subtitle-b-18 text-center">회원가입</p>
        </header>
        <ProgressBar width={emailAuth ? "264" : "176"} className="mb-8" />
        <section className="flex flex-col gap-6">
          <div>
            <p className="text-2xl font-bold mb-2">
              {emailAuth ? "인증번호를 입력해주세요" : "이메일을 입력해주세요"}
            </p>
            <p className="body-r-14 text-grey-3">본인 인증을 위해 필요해요.</p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <InputField2
              placeholder={emailAuth ? "인증번호 입력" : "이메일 입력"}
              className="w-full"
            />
          </div>
        </section>
      </section>
      <Button labelName="인증번호 전송" className="mb-4" onClick={handleNext} />
    </div>
  );
}
