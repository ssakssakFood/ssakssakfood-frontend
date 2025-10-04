import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField2 from "../../components/InputField2";
import { ProgressBar } from "../../components/ProgressBar";

export default function OnBoardingPage() {
  //   const onSubmit = () => {};

  const navigate = useNavigate();

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
        <ProgressBar width="88" className="mb-8" />
        <section className="flex flex-col gap-6">
          <p className="text-2xl font-bold ">닉네임을 입력해주세요</p>
          <div className="flex items-center gap-2 mb-3">
            <InputField2 placeholder="닉네임 입력" className="w-full" />
            <div>
              <button
                className="w-20 px-3 flex h-12 rounded-lg items-center justify-center text-white button-sb-14 bg-main1"
                // onClick={}
              >
                중복확인
              </button>
            </div>
          </div>
        </section>
        <p className="body-r-14 text-main2 p">사용 가능한 닉네임입니다.</p>
      </section>
      <Button
        labelName="다음"
        className="mb-8"
        onClick={() => navigate("/onBoardingConfirm")}
      />
    </div>
  );
}
