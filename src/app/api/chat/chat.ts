import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../ajax";

export const getChatSessionListApi = (
  payload: any,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.GET_CHAT_SESSION, API_METHODS.POST, payload, callback);
};

export const getAIProfileListApi = (
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.AI_PROFILE, API_METHODS.GET, {}, callback);
};

export const sendMessageApi = (
  payload: any,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.SEND_MESSAGE, API_METHODS.POST, payload, callback);
};

export const getChatHistoryApi = (
  params: string,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(`${API_CONSTANTS.CHAT_HISTORY}${params}`, API_METHODS.GET, {}, callback);
};

export const getChatSessionDataApi = (
  params: string,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(`${API_CONSTANTS.GET_CHAT_SESSION_DATA}${params}`, API_METHODS.GET, {}, callback);
};