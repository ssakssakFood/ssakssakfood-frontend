import { useMutation, useQuery } from "react-query";
import api from "../apiMember";
import type {
  CreateReservationDto,
  ReservationDto,
  MyReservationDto,
  OwnerReservationDto,
  ApiResponse,
} from "@/types/reservation";

/*
특정 메뉴(menuId)에 대해 예약을 생성합니다.
요청 필드:
- foodQuantity: 예약 수량 (1 이상 정수)
- pickupTime: 수령 시각 (예: 2025-10-23T15:30:00.000Z)
*/
export const createReservation = async (
  menuId: number,
  body: CreateReservationDto,
): Promise<ReservationDto> => {
  const { data } = await api.post<ApiResponse<ReservationDto>>(
    `/reservations/menus/${menuId}`,
    body,
  );
  return data.result;
};

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: ({
      menuId,
      body,
    }: {
      menuId: number;
      body: CreateReservationDto;
    }) => createReservation(menuId, body),
  });
};

/*
고객이 자신이 예약한 모든 내역을 조회합니다.
*/
export const getMyReservations = async (): Promise<MyReservationDto[]> => {
  const { data } = await api.get<ApiResponse<MyReservationDto[]>>(
    `/reservations/my`,
  );
  return data.result;
};

export const useGetMyReservations = () => {
  return useQuery({
    queryKey: ["myReservations"],
    queryFn: getMyReservations,
  });
};

/*
특정 가게(storeId)에 대해 지정한 날짜(date)에 해당하는 예약 내역을 조회합니다.
날짜는 yyyy-MM-dd 형식으로 전달합니다.
*/
export const getStoreReservationsByDate = async (
  storeId: number,
  date: string,
): Promise<OwnerReservationDto[]> => {
  const { data } = await api.get<ApiResponse<OwnerReservationDto[]>>(
    `/reservations/store/${storeId}/date`,
    {
      params: { date },
    },
  );
  return data.result;
};

export const useGetStoreReservationsByDate = (
  storeId: number | undefined,
  date: string,
) => {
  return useQuery({
    queryKey: ["storeReservations", storeId, date],
    queryFn: () => getStoreReservationsByDate(storeId!, date),
    enabled: !!storeId,
  });
};
