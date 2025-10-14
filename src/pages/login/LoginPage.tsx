import Button from "../../components/Button";
import InputField from "../../components/InputField";
import LogoImg from "@assets/images/logo.png";
import Login from "@assets/images/login.png";
import managerLogin from "@assets/images/manager-login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserLogin } from "@/api/mamber/onboarding";
import { useForm } from "react-hook-form";
export default function LoginPage() {
  const [manager, setManager] = useState<boolean>(false);
  const [pwChecked, setpwChecked] = useState<boolean>(false);
  const revertManager = () => {
    setManager(true);
  };
  const navigate = useNavigate();
  const userLoginForm = useUserLogin();
  const { register, watch } = useForm({
    defaultValues: {
      login: "qwer1234",
      password: "qwer1234Q@",
    },
  });
  const handleLogin = () => {
    userLoginForm.mutate({
      loginId,
      password,
    });
    navigate("/");
  };
  const loginId = watch("login");
  const password = watch("password");

  return (
    <div className="flex flex-col min-h-dvh -mx-6 ">
      <div className="bg-main1">
        <img src={LogoImg} alt="" className="size-40 mx-auto my-25" />
      </div>
      <div className="relative flex justify-center">
        <div className="absolute -bottom-12 w-full h-[100px] bg-white rounded-full flex items-center justify-center ">
          <img src={manager ? managerLogin : Login} alt="" className="-mt-6" />
        </div>
      </div>
      <section className="bg-white px-6 flex-1">
        <div>
          <InputField
            placeholder="아이디 입력"
            className="mb-2 pt-4"
            pwCheck={true}
            register={register("login")}
          />
          <InputField
            placeholder="비밀번호입력"
            icon={true}
            className="mb-3"
            pwCheck={pwChecked}
            onClick={() => setpwChecked((pre) => !pre)}
            register={register("password")}
          />
          <Button
            labelName="로그인"
            className="mb-4"
            disabled={false}
            onClick={handleLogin}
          />

          <div className="flex items-center justify-center body-r-14 text-grey-2 mb-5">
            <p className="pr-1">이메일 찾기 |</p>
            <p className="pr-1"> 비밀번호 찾기 |</p>
            <p
              className="pr-1 cursor-pointer"
              onClick={() => navigate("/term")}
            >
              회원가입
            </p>
          </div>
        </div>
        <div className={manager ? "hidden" : "flex items-center w-full"}>
          <div className="flex-1 h-px bg-grey-3" />
          <p className="mx-2 text-grey-3 body-r-14">사장님이신가요?</p>
          <div className="flex-1 h-px bg-grey-3" />
        </div>
      </section>
      <button
        className={
          manager
            ? "hidden"
            : "mx-6 text-main1 bg-sub1 flex h-12  py-4 px-5.32rem rounded-lg items-center justify-center subtitle-b-16 mb-6"
        }
        onClick={revertManager}
      >
        사장님으로 로그인
      </button>
    </div>
  );
}
