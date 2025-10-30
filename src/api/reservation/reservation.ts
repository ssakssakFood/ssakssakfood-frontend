import { useMutation, useQuery } from "react-query";
import api from "../apiMember";
import type {
  CreateReservationDto,
  ReservationDto,
  MyReservationDto,
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
