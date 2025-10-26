import Button from "@/components/Button";
import { CategoryMiniBadge } from "@/components/CategoryBadge";
import { MenuHeader } from "@/components/Headers";
import ImagePickerBox from "@/components/ImagePickerBox";
import InputField2 from "@/components/InputField2";
import { CATEGORY } from "@/constants/Category";
import { useState } from "react";

export default function AddFoodPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [foodName, setFoodName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");

  // 모든 필드가 채워졌는지 확인
  const isFormValid =
    foodName.trim() !== "" &&
    selectedCategory !== "" &&
    imageFile !== null &&
    costPrice.trim() !== "" &&
    sellingPrice.trim() !== "";

  return (
    <div>
      <MenuHeader title="식품 추가" />
      <div className="flex flex-col gap-6 mb-[100px]">
        <div className="flex flex-col gap-2 justify-center">
          <div className="text-[16px] font-bold">식품 이름</div>
          <InputField2
            placeholder="상품 이름 입력"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
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
        </div>
        <div>
          <div className="text-[16px] font-bold">사진 첨부</div>
          <div className="text-[14px] font-[500] text-[#A8A8A8] mt-2">
            사진은 1개만 첨부 가능해요.
          </div>
          <ImagePickerBox
            boxClass="w-[160px] h-[160px]"
            className="mt-[16px]"
            onChange={(file) => setImageFile(file)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[16px] font-bold">원가</div>
          <InputField2
            placeholder="금액 입력"
            inputClassName="pr-[40px]"
            type="number"
            inputText="원"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[16px] font-bold">판매가</div>
          <InputField2
            placeholder="금액 입력"
            inputClassName="pr-[40px]"
            type="number"
            inputText="원"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>
      </div>
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[401px] bg-white border-t border-gray-100 z-50">
        <div className="p-4">
          <Button
            className="w-full text-lg py-6 cursor-pointer"
            labelName="식품 추가 완료하기"
            disabled={!isFormValid}
          />
        </div>
      </footer>
    </div>
  );
}