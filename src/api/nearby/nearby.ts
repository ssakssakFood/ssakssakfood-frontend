import api from "@/api/apiMember";
import { NearbyRequestDTO } from "@/types/nearby";
import { useMutation, useQuery } from "react-query";
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

export const useRouteRegister = () => {
  return useMutation({
    mutationFn: (body: NearbyRequestDTO) => postNearby(body),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => console.error(err),
  });
};
