import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../ajax";

export const loginApi = (
  payload: any,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.LOGIN, API_METHODS.POST, payload, callback);
};

export const signUpApi = (
  payload: any,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.SIGN_UP, API_METHODS.POST, payload, callback);
};

export const googleOAuthApi = (
  payload: any,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.GOOGLE_OAUTH, API_METHODS.POST, payload, callback);
};
