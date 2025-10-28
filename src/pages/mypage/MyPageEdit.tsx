import PageHeader from "@/components/PageHeader";
import ImgUrl from "@/assets/images/progile.png";
import Camera from "@/assets/images/camera.png";
import MyPageInputField from "@/components/MyPageInputFiled";
export default function MyPageEdit() {
  return (
    <div className=" flex flex-col min-h-dvh">
      <PageHeader title="내 정보 수정" />
      <div className="items-center flex justify-center flex-col ">
        <img src={ImgUrl} alt="" className="mt-6 " />
        {/* <img src="" alt="" /> */}
        <MyPageInputField className="w-full mb-6" labelName="닉네임" />
        <MyPageInputField className="w-full mb-6" labelName="아이디" />
        <MyPageInputField className="w-full mb-6" labelName="비밀번호" />
        <MyPageInputField className="w-full mb-6" labelName="전화번호 " />
      </div>
    </div>
  );
}
