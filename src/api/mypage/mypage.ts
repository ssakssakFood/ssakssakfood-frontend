//내 프로필 조회

import api from "@/api/apiMember";
import { UserLoginRequestDTO, UserPwRequestDTO } from "@/types/mypage";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const getMyProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};
export const useMyProfile = () => {
  return useQuery({
    queryFn: getMyProfile,
    queryKey: ["myProfile"],
  });
};

//닉네임 수정
export const patchNickname = async (nickname: string) => {
  const { data } = await api.patch("/users/me/nickname", nickname);
  return data;
};

export const usePatchNickname = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (nickname: string) => patchNickname(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });
      console.log("성공");
    },
    onError: (err) => console.log(err),
  });
};

//아이디 수정

//body
// "newLoginId": "S7RDoHl2zPz",
// "currentPassword": "string"

export const patchUserId = async (body: UserLoginRequestDTO) => {
  const { data } = await api.patch("/users/me/login-id", body);
  return data;
};

export const usePatchUserId = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UserLoginRequestDTO) => patchUserId(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });
      console.log("성공");
    },
    onError: (err) => console.log(err),
  });
};

//비밀번호 수정
export const pathchPw = async (body: UserPwRequestDTO) => {
  const { data } = await api.patch("/users/me/password", body);
  return data;
};

export const usePatchPw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UserPwRequestDTO) => pathchPw(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });
      console.log("성공");
    },
    onError: (err) => console.log(err),
  });
};

//휴대폰 번호 수정
export const pathchPhone = async (phone: string) => {
  const { data } = await api.patch("/users/me/phone", phone);
  return data;
};

export const usePatchPhone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (phone: string) => pathchPhone(phone),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });
      console.log("성공");
    },
    onError: (err) => console.log(err),
  });
};
