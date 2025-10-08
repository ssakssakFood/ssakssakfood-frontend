import { useQuery } from "react-query";
import type {
  EmailRequestDTO,
  EmailSend,
  UserSignUpRequestDto,
} from "../../types/onboarding";
import api from "../apiMember";

export const onBoardingEmail = async (body: EmailSend) => {
  const { data } = await api.post("/email/send", body);
  return data;
};

export const onBoardingEmailCode = async (body: EmailRequestDTO) => {
  const { data } = await api.post("/email/verify", body);
  return data;
};

export const onBoardingSignup = async (body: UserSignUpRequestDto) => {
  const { data } = await api.post("/users/signup", body);
  return data;
};

//중복쳌
export const getCheckNickname = async (nickname: string) => {
  const { data } = await api.get("/users/checknickname", {
    params: { nickname },
  });
  return data;
};
export const useNicknameCheck = (nickname: string) => {
  return useQuery({
    queryKey: ["nickname", nickname],
    enabled: false,
    queryFn: () => getCheckNickname(nickname),

    select: (res) => res.data,
  });
};
