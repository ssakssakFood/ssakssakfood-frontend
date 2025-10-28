import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useUploadImg } from "@/api/mamber/onboarding";
import ImagePickerBox from "@/components/ImagePickerBox";

export default function MyPageCard() {
  const location = useLocation();
  console.log(location);

  const raw = localStorage.getItem("user");
  const memberId: number | undefined = raw
    ? JSON.parse(raw)?.state?.user?.memberId
    : undefined;

  console.log(memberId);
  const upLoadCardImg = useUploadImg(Number(memberId));
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handlePick = (f: File | null, url: string) => {
    setFile(f);
    setPreview(url);
  };

  const cardUrl = localStorage.getItem("cardUrl") || undefined;

  const handleNext = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      upLoadCardImg.mutate(formData, {
        onSuccess: (res) => {
          localStorage.setItem("cardImg", res.data.imageUrl);
          console.log(res);
        },
      });
    }
  };

  return (
    <div className="w-full flex flex-col min-h-dvh ">
      <section className="flex-1">
        <PageHeader title="아동 급식카드 관리" />

        {/* 아디 */}
        <div className="flex justify-between mb-4 items-center mt-3">
          <p className="subtitle-b-18">등록된 급식카드</p>
          <button
            className="text-sm font-medium py-[6px] px-2 rounded-sm bg-grey-5"
            onClick={handleNext}
          >
            사진변경
          </button>
        </div>
        <ImagePickerBox
          file={file}
          previewUrl={preview || cardUrl}
          onChange={handlePick}
          boxClass="w-full h-[240px]"
        />
      </section>

      {/* <Button
        labelName={preview ? "회원가입 완료하기" : "등록없이 회원가입하기"}
        className="mb-8"
        disabled={false}
        onClick={handleNext}
      /> */}
    </div>
  );
}
