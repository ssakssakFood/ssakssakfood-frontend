import { CategoryMiniBadge } from "@/components/CategoryBadge";
import { MenuHeader } from "@/components/Headers";
import ImagePickerBox from "@/components/ImagePickerBox";
import InputField2 from "@/components/InputField2";
import { CATEGORY } from "@/constants/Category";
import { useState } from "react";
import cornorImg from "@/assets/icons/corner-down-right.svg";

export default function AddFoodEditPage() {
  const [foodName, setFoodName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");

  const isFormValid =
    foodName.trim() !== "" &&
    selectedCategory !== "" &&
    imageFile !== null &&
    costPrice.trim() !== "" &&
    sellingPrice.trim() !== "";
  return (
    <div className="flex flex-col gap-6">
      <MenuHeader title="식품 정보 수정" />
      <div className="flex flex-col gap-2 justify-center relative">
        <div className="text-[16px] font-bold">식품 이름</div>
        <InputField2 placeholder="상품 이름 입력" value={"dd"} />
        <div className="text-orange-500 absolute top-11 right-4 cursor-pointer">
          변경
        </div>
      </div>
      <div className="flex gap-4 relative">
        <img src={cornorImg} alt="변경" />
        <div className="flex flex-col gap-2 w-full">
          <div className="text-[16px] font-bold">변경할 이름</div>
          <InputField2
            placeholder="변경할 이름 입력"
            inputClassName="pr-[80px]"
          />
        </div>
        <div className="text-orange-500 absolute top-11 right-4 cursor-pointer text-[16px]">
          변경 완료
        </div>
      </div>
      <div className="flex flex-col relative">
        <div className="text-[16px] font-bold">카테고리</div>
        <div className="text-[14px] font-[500] text-[#A8A8A8] mt-2">
          카테고리는 1개만 선택 가능해요.
        </div>
        <div className="flex flex-wrap gap-2 max-w-[75%] mt-4">
          {CATEGORY.slice(0, -2).map((category) => (
            <CategoryMiniBadge
              key={category.slug}
              label={category.label}
              active={selectedCategory === category.slug}
              onClick={() => setSelectedCategory(category.slug)}
            />
          ))}
        </div>
        <div className="text-orange-500 absolute top-0 right-0 cursor-pointer bg-[#F3F3F3] px-[16px] py-[6px] rounded-md">
          변경
        </div>
      </div>
      <div className="flex gap-4 relative">
        <img src={cornorImg} alt="변경" />
        <div className="flex flex-col w-full">
          <div className="text-[16px] font-bold">변경할 카테고리</div>
          <div className="text-[14px] font-[500] text-[#A8A8A8]">
            카테고리는 1개만 선택 가능해요.
          </div>
          <div className="flex flex-wrap gap-2 max-w-[80%] mt-4">
            {CATEGORY.slice(0, -2).map((category) => (
              <CategoryMiniBadge
                key={category.slug}
                label={category.label}
                active={selectedCategory === category.slug}
                onClick={() => setSelectedCategory(category.slug)}
              />
            ))}
          </div>
        </div>
        <div className="text-orange-500 absolute top-0 right-0 cursor-pointer text-[16px] bg-[#F3F3F3] px-[12px] py-[6px] rounded-md">
          변경 완료
        </div>
      </div>
      <div className="relative">
        <div className="text-[16px] font-bold">사진 첨부</div>
        <div className="text-[14px] font-[500] text-[#A8A8A8] mt-2">
          사진은 1개만 첨부 가능해요.
        </div>
        <ImagePickerBox
          boxClass="w-[160px] h-[160px]"
          className="mt-[16px]"
          onChange={(file) => setImageFile(file)}
        />
        <div className="text-orange-500 absolute top-0 right-0 cursor-pointer bg-[#F3F3F3] px-[16px] py-[6px] rounded-md">
          변경
        </div>
      </div>
      <div className="flex gap-4 relative">
        <img src={cornorImg} alt="변경" />
        <div className="flex flex-col w-full">
          <div className="text-[16px] font-bold">변경할 사진</div>
          <div className="text-[14px] font-[500] text-[#A8A8A8]">
            사진은 1개만 첨부 가능해요.
          </div>
          <ImagePickerBox
            boxClass="w-[160px] h-[160px]"
            className="mt-[16px]"
            onChange={(file) => setImageFile(file)}
          />
        </div>
        <div className="text-orange-500 absolute top-0 right-0 cursor-pointer text-[16px] bg-[#F3F3F3] px-[12px] py-[6px] rounded-md">
          변경 완료
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center relative">
        <div className="text-[16px] font-bold">원가</div>
        <InputField2 placeholder="상품 이름 입력" value={"9000"} />
        <div className="text-orange-500 absolute top-11 right-4 cursor-pointer">
          변경
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center relative">
        <div className="text-[16px] font-bold">판매가</div>
        <InputField2 placeholder="상품 이름 입력" value={"4500"} />
        <div className="text-orange-500 absolute top-11 right-4 cursor-pointer">
          변경
        </div>
      </div>
    </div>
  );
}
