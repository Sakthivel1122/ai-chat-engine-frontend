import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../ajax";

export const createAiProfileApi = (
  payload: any,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.AI_PROFILE, API_METHODS.POST, payload, callback);
};

export const deleteAiProfileApi = (
  params: any,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(
    `${API_CONSTANTS.AI_PROFILE}${params}`,
    API_METHODS.DELETE,
    {},
    callback
  );
};

export const getAdminDashboardApi = (
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.ADMIN_DASHBOARD, API_METHODS.GET, {}, callback);
};

export const getMessageExchangedListApi = (
  payload: any,
  callback: (res: any) => void = () => {}
) => {
  fetchCall(
    API_CONSTANTS.ADMIN_MESSAGES_CHART_LIST,
    API_METHODS.POST,
    payload,
    callback
  );
};

export const getAllUserListApi = (
  callback: (res: any) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.ADMIN_GET_ALL_USER_LIST, API_METHODS.GET, {}, callback);
};
