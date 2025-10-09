import { create } from "zustand";

//닉네임, 이메일 , 비번 , 전번 , 사용자 , 이메일 인증 여부
interface OnboardingState {
  nickname: string;
  //   gender: "male" | "female" | null;
  phone: string;
  emailVerified: boolean;
  loginId: string;
  email: string;
  memberType: string;
  password: string;
  setTemp: (field: Partial<OnboardingState>) => void;
  reset: () => void;
}

export const useOnboardingState = create<OnboardingState>((set) => ({
  nickname: "",
  password: "",
  //   gender: null,
  phone: "",
  emailVerified: false,
  loginId: "",
  email: "",
  memberType: "",

  setTemp: (field) => set((state) => ({ ...state, ...field })),
  reset: () =>
    set({
      nickname: "",
      //   gender: null,
      //   birth: "",
      password: "",
      phone: "",
      loginId: "",
      emailVerified: false,
      email: "",
      memberType: "",
    }),
}));
