import api from "@/api/apiMember";
import { NearbyRequestDTO } from "@/types/nearby";
import { useQuery } from "react-query";
//경로 목록 조회
export const getnearby = async () => {
  const { data } = await api.get("/routes");
  return data;
};

export const useGetNearby = () => {
  return useQuery({
    queryFn: getnearby,
    queryKey: ["routes"],
  });
};

//route등록하기
export const postNearby = async (body: NearbyRequestDTO) => {
  const { data } = await api.post("/routes", body);
  return data;
};
