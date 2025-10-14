import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField2 from "../../components/InputField2";
import { ProgressBar } from "../../components/ProgressBar";
import ChevronL from "@assets/icons/chevron-left.svg";
import { useOnboardingState } from "../../store/useOnboardingStore";
import { useState } from "react";

export default function OnboardingNumber() {
  const [phone, setPhone] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const { setTemp } = useOnboardingState();
  const handleNext = () => {
    setTemp({ phone: phone });
    navigate("/onBoarding/pass");
  };

  const phoneRegex = /^01[0-9]-[0-9]{4}-[0-9]{4}$/;
  const handleInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNum = e.target.value.replace(/\D/g, "").slice(0, 11); // 숫자만, 최대 11자리
    let formatted = "";
    if (phoneNum.length < 4) {
      formatted = phoneNum;
    } else if (phoneNum.length < 8) {
      formatted = `${phoneNum.slice(0, 3)}-${phoneNum.slice(3)}`;
    } else {
      formatted = `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 7)}-${phoneNum.slice(7)}`;
    }
    setPhone(formatted);
    setIsValid(phoneRegex.test(formatted));
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
        <ProgressBar width="88" className="mb-8" />
        <section className="flex flex-col gap-6">
          <p className="text-2xl font-bold ">전화번호를 입력해주세요</p>
          <div className="flex items-center gap-2 mb-2">
            <InputField2
              placeholder="전화번호 입력"
              className="w-full"
              value={phone}
              onChange={handleInputPhone}
            />
          </div>
        </section>
      </section>
      <Button
        labelName="다음"
        className="mb-8"
        onClick={handleNext}
        disabled={!isValid}
      />
    </div>
  );
}
