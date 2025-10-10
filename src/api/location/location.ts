import type {
  gpsLocationSavedRequest,
  locationSavedRequest,
} from "../../types/location";
import api from "../apiMember";

//회원 주소 추가
export const postLocation = async (payload: locationSavedRequest) => {
  const res = await api.post("/locations/saved", payload);
  return res.data.data;
};

//회원 현재 위치 추가
export const postGpsLocation = async (payload: gpsLocationSavedRequest) => {
  const res = await api.post("/locations/current", payload);
  return res.data.data;
};
