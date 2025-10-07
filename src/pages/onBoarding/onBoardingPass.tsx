import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import InputField2 from "../../components/InputField2";
import Button from "../../components/Button";
import { useState } from "react";
import { useOnboardingState } from "../../store/useOnboardingStore";

export default function OnBoardingPassPage() {
  const navigate = useNavigate();

  const { setTemp } = useOnboardingState();
  const [step, setStep] = useState(1);
  const [idValue, setIdValue] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState(false);

  const IdRegex = /^.{4,}$/;
  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setIdValue(id);
    setIsInputValid(IdRegex.test(id));
    setTemp({ loginId: id });
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
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
        <ProgressBar width={"354"} className="mb-8" />

        {step === 1 ? (
          <section className="flex flex-col gap-6">
            <div>
              <p className="text-2xl font-bold mb-2">{"ID를 입력해주세요"}</p>
              <p className="body-r-14 text-grey-3">
                본인 인증을 위해 필요해요.
              </p>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <InputField2
                placeholder={"아이디 입력"}
                className="w-full"
                value={idValue}
                onChange={handleInputId}
              />
            </div>
          </section>
        ) : (
          <section className="flex flex-col gap-6">
            <p className="text-2xl font-bold mb-2">비밀번호를 입력해주세요</p>
            {/* 다음 */}
            <div className="flex flex-col justify-center w-full">
              <InputField2
                placeholder={"비밀번호 입력"}
                className="mb-3"
                type="password"
                icon={true}
              />
              <div className="flex gap-2 items-center">
                <img src="/icons/check.svg" alt="" />
                <p className="mb-1 caption-r-12 text-grey-3">
                  공백없이 8자~20자
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/icons/check.svg" alt="" />
                <p className="mb-1 caption-r-12 text-grey-3">
                  대소문자, 숫자, 특수문자 1개 이상 포함
                </p>
              </div>
            </div>
            {/* 다음 */}

            <InputField2
              placeholder={"비밀번호 확인"}
              type="password"
              icon={true}
            />
          </section>
        )}
      </section>

      <Button
        labelName={step === 1 ? "다음" : "회원가입 완료"}
        className="mb-8"
        disabled={!isInputValid}
        onClick={handleNext}
      />
    </div>
  );
}
