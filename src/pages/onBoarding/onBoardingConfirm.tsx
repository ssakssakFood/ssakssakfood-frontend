import { useState } from "react";
import Button from "../../components/Button";
import InputField2 from "../../components/InputField2";
import { ProgressBar } from "../../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import ChevronL from "@assets/icons/chevron-left.svg";

import type { EmailRequestDTO, EmailSend } from "../../types/onboarding";
import {
  onBoardingEmail,
  onBoardingEmailCode,
} from "../../api/mamber/onboarding";
import { useOnboardingState } from "../../store/useOnboardingStore";

export default function OnBoardingConfirmPage() {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState<string>("");
  const [codeValue, setCodeValue] = useState<string>("");

  const { setTemp } = useOnboardingState();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const codeRegex = /^\d{6}$/;
  //이메일 전후
  const [isVerify, setIsVerify] = useState<boolean>(false);
  //이메일 전후
  // const [isInputValid, setIsInputValid] = useState(false);

  //버튼
  const isValid =
    emailRegex.test(emailValue.trim()) && codeRegex.test(codeValue.trim());

  //이메일전송
  const sendEmail = useMutation({
    mutationFn: (body: EmailSend) => onBoardingEmail(body),
    onSuccess: () => {
      setTemp({ email: emailValue });
      setIsVerify(true);
      setCodeValue("");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  //코드 인증
  const sendCode = useMutation({
    mutationFn: (body: EmailRequestDTO) => onBoardingEmailCode(body),
    onSuccess: () => {
      console.log("성공");
      navigate("/onBoardingPassPage");
    },
    onError: (err) => console.log(err),
  });

  const handleNext = () => {
    const email = emailValue.trim();
    if (!isVerify) {
      sendEmail.mutate({ email: email });
    } else {
      const code = codeValue.trim();
      sendCode.mutate({ email, code });
    }
  };

  return (
    <div className="w-full flex flex-col min-h-dvh ">
      <section className="flex-1 ">
        <header className="h-12 relative flex items-center self-stretch justify-center mb-8">
          <img
            src={ChevronL}
            alt="뒤로가기"
            className=" absolute left-0 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="subtitle-b-18 text-center">회원가입</p>
        </header>
        <ProgressBar width={isVerify ? "264" : "176"} className="mb-8" />
        <section className="flex flex-col gap-6">
          <div>
            <p className="text-2xl font-bold mb-2">이메일을 입력해주세요</p>
            <p className="body-r-14 text-grey-3">본인 인증을 위해 필요해요.</p>
          </div>
          <div className="">
            <div className="flex items-center gap-2 mb-4">
              <InputField2
                placeholder="이메일 입력"
                className="w-full"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value.trim())}
              />
              <div>
                <button
                  className="min-w-25 px-3 flex h-12 rounded-lg items-center justify-center text-white button-sb-14 bg-main1"
                  onClick={handleNext}
                  // disabled={!nicknameValue.trim() || isFetching}
                  disabled={
                    isVerify ||
                    !emailRegex.test(emailValue.trim()) ||
                    sendEmail.isLoading
                  }
                >
                  인증번호 전송
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <InputField2
                placeholder="인증번호 입력"
                className="w-full"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value.trim())}
              />
            </div>
          </div>
        </section>
      </section>
      <Button
        labelName={"다음"}
        className="mb-8"
        onClick={handleNext}
        disabled={!isValid || sendEmail.isLoading || sendCode.isLoading}
      />
    </div>
  );
}
