import type { locationSavedRequest } from "../../types/location";
import api from "../apiMember";

//회원 주소 추가
export const postLocation = async (payload: locationSavedRequest) => {
  const res = await api.post("/locations/saved", payload);
  return res.data.data;
};
