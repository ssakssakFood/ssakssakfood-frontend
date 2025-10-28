import PageHeader from "@/components/PageHeader";
import ImgUrl from "@/assets/images/progile.png";
import Camera from "@/assets/images/camera.png";
import MyPageInputField from "@/components/MyPageInputFiled";
import {
  useMyProfile,
  usePatchNickname,
  usePatchPhone,
  usePatchPw,
  usePatchUserId,
} from "@/api/mypage/mypage";
import { useState } from "react";
import { useOwnerImg } from "@/api/mamber/onboarding";
export default function MyPageEdit() {
  const { data } = useMyProfile();
  console.log(data);
  type FieldKey = "nickname" | "loginId" | "password" | "phone";
  const [open, setOpen] = useState<Record<FieldKey, boolean>>({
    nickname: false,
    loginId: false,
    password: false,
    phone: false,
  });

  const toggle = (k: FieldKey) =>
    setOpen((prev) => ({ ...prev, [k]: !prev[k] }));

  const [form, setForm] = useState({
    nickname: "",
    loginId: "",
    password: "",
    phone: "",
  });
  const onChangeField =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  // const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  //닉넴
  const handleNickName = usePatchNickname();

  //아디
  const handleUserId = usePatchUserId();
  //비번
  // const handlePw = usePatchPw();

  //전번
  const handlePhone = usePatchPhone();

  //프로필 이미지
  const uploadStoreProfile = useOwnerImg();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);
    await uploadStoreProfile.mutateAsync({
      memberId: data?.id,
      body: formData,
    });
  };
  return (
    <div className=" flex flex-col min-h-dvh">
      <PageHeader title="내 정보 수정" />
      <div className="items-center flex justify-center flex-col ">
        <label htmlFor="profile" className="relative cursor-pointer">
          <div className="relative flex items-center justify-center">
            <img
              src={preview || data.profileImageUrl || ImgUrl}
              alt=""
              className="mt-6 size-28 rounded-full shrink-0"
            />
            <img
              src={Camera}
              alt=""
              className="absolute right-0   bottom-0 size-9"
            />
          </div>
          <input
            type="file"
            className="hidden"
            id="profile"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <MyPageInputField
          className="w-full mb-6 mt-8"
          labelName="닉네임"
          value={form.nickname}
          placeholder={data?.nickname}
          onChangeClick={() => toggle("nickname")}
          onChange={onChangeField("nickname")}
          isChange={open.nickname}
          onChangeUser={() =>
            handleNickName.mutate(form.nickname, {
              onSuccess: () => {
                setForm((pre) => ({ ...pre, nickname: "" }));
              },
            })
          }
        />

        {/* <MyPageInputField
          className="w-full mb-6"
          labelName="아이디"
          value={form.loginId}
          placeholder={data?.loginId}
          onChangeClick={() => toggle("loginId")}
          onChange={onChangeField("loginId")}
          isChange={open.loginId}
          onChangeUser={() =>
            handleUserId.mutate({
              newLoginId: form.loginId,
              currentPassword: String(data?.password),
            })
          }
        /> */}

        {/* <MyPageInputField
          className="w-full mb-6"
          labelName="비밀번호"
          value={form.password}
          placeholder={data?.password}
          onChangeClick={() => toggle("password")}
          onChange={onChangeField("password")}
          isChange={open.password}
          onChangeUser={() =>
            handlePw.mutate({
              newPassword: form.password,
              currentPassword: String(data?.password),
            })
          }
        /> */}
        <MyPageInputField
          className="w-full mb-6"
          labelName="전화번호 "
          placeholder={data?.phone?.replace(
            /^(\d{3})(\d{3,4})(\d{4})$/,
            "$1-$2-$3"
          )}
          value={form.phone}
          onChangeClick={() => toggle("phone")}
          onChange={onChangeField("phone")}
          isChange={open.phone}
          onChangeUser={() =>
            handlePhone.mutate(form.phone, {
              onSuccess: () => {
                setForm((pre) => ({ ...pre, phone: "" }));
              },
            })
          }
        />
      </div>
    </div>
  );
}
