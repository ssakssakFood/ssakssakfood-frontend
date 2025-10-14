import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import Button from "../../components/Button";
import { useOnboardingState } from "../../store/useOnboardingStore";
import { useMutation } from "react-query";
import type { UserSignUpRequestDto } from "../../types/onboarding";
import { onBoardingSignup } from "../../api/mamber/onboarding";
import ChevronL from "@assets/icons/chevron-left.svg";
import { useState } from "react";

export default function OnBoardingCardPage() {
  const navigate = useNavigate();

  const { setTemp, email, loginId, password, nickname, phone } =
    useOnboardingState();

  const [isCard, setIsCard] = useState();

  //회원가입 하기
  const handleSignupForm = useMutation({
    mutationFn: (body: UserSignUpRequestDto) => onBoardingSignup(body),
    onSuccess: () => {
      console.log("성공");
      navigate("/");
    },
    onError: (err) => console.log(err),
  });

  const handleNext = () => {
    handleSignupForm.mutate({
      email,
      loginId,
      password: password,
      nickname: nickname,
      phoneNumber: phone,
    });
  };

  console.log(email, loginId, password, nickname);
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
        <ProgressBar width={"354"} className="mb-8" />

        {/* 아디 */}
        <div className="flex flex-col">
          <p className="text-2xl font-bold mb-2">급식카드를 입력해주세요</p>
          <div className="body-r-14 text-grey-3">
            <p>급식카드를 등록할 경우, 특정 식품에 한해</p>
            <p>무료로 구매할 수 있어요</p>
          </div>
        </div>
      </section>

      <Button
        labelName={isCard ? "다음" : "회원가입 완료"}
        className="mb-8"
        // disabled={isCard? !isInputValid : !nextBtn}
        onClick={handleNext}
      />
    </div>
  );
}
