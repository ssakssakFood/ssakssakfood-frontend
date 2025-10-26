import apiC from "@/api/apiCatalog";
import api from "@/api/apiMember";
import { NearbyAlongRouteRequest, NearbyRequestDTO } from "@/types/nearby";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: NearbyRequestDTO) => postNearby(body),
    onSuccess: (res) => {
      console.log(res);
      navigate("/nearby");
    },
    onError: (err) => console.error(err),
  });
};

//route 삭제
export const deleteNearby = async (routeId: number) => {
  const { data } = await api.delete(`/routes/${routeId}`);
  return data;
};

export const useRouteDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (routeId: number) => deleteNearby(routeId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      console.log(res);
    },
    onError: (err) => console.error(err),
  });
};

//카탈로그 , 경로 주변 탐색

export const postAlongRoute = async (body: NearbyAlongRouteRequest) => {
  const { data } = await api.post("/nearby/along-route", body);
  return data;
};

export const useAlongRoute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: NearbyAlongRouteRequest) => postAlongRoute(body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      console.log(res);
    },
    onError: (err) => console.error(err),
  });
};
