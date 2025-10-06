import Button from "../../components/Button";
import InputField from "../../components/InputField";

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col min-h-dvh ">
      <section className="mb-60 mt-auto">
        <InputField placeholder="이메일 입력" className="mb-2" />
        <InputField placeholder="비밀번호입력" icon={true} className="mb-3" />
        <Button labelName="로그인" className="mb-4" />

        <div className="flex items-center justify-center body-r-14 text-grey-2">
          <p className="pr-1">이메일 찾기 |</p>
          <p className="pr-1"> 비밀번호 찾기 |</p>
          <p className="pr-1">회원가입</p>
        </div>
      </section>
    </div>
  );
}
