import api from "@/api/apiMember";
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
