// import type { EmailRequestDTO } from "../../types/email";
// import api from "../apiMember";

import type {
  EmailRequestDTO,
  EmailSend,
  UserSignUpRequestDto,
} from "../../types/onboarding";
import api from "../apiMember";

// export const postEmailVerfiy = async (body: EmailRequestDTO) => {
//   const { data } = await api.post("/email/verify", body);
//   return data;
// };

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
