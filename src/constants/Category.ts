export type CategorySlugType =
  | "breads"
  | "packedmeal"
  | "ingredients"
  | "restaurant"
  | "market"
  | "convenience"
  | "sharing"
  | "ssakssakstore";

export type CategoryLabelType =
  | "빵/디저트"
  | "도시락/반찬"
  | "식자재"
  | "식당/조리"
  | "시장"
  | "편의점"
  | "나눔"
  | "착한가게";

export type CategoryItem = {
  label: CategoryLabelType;
  slug: CategorySlugType;
};
//아이콘 추가 예정
export const CATEGORY: CategoryItem[] = [
  { label: "빵/디저트", slug: "breads" },
  { label: "도시락/반찬", slug: "packedmeal" },
  { label: "식자재", slug: "ingredients" },
  { label: "식당/조리", slug: "restaurant" },
  { label: "시장", slug: "market" },
  { label: "편의점", slug: "convenience" },
  { label: "나눔", slug: "sharing" },
  { label: "착한가게", slug: "ssakssakstore" },
];
