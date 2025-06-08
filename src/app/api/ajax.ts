// lib/api/fetchCall.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios, { Method } from "axios";
import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { LocalStorage } from "@/utils/storage";
import { getSession } from "next-auth/react";

export const fetchCall = async <T>(
  url: string,
  method: string,
  payload: any = {},
  callback: (res: T | any) => void = () => {},
  isServerSide: boolean = false,
  clientToken?: string
): Promise<void> => {
  let accessToken: string | undefined;

  // Get token based on context
  if (clientToken) {
    accessToken = clientToken;
  } else if (isServerSide) {
    const session = await getServerSession(authOptions);
    accessToken = session?.accessToken;
  } else {
    if (typeof window !== "undefined") {
      const session = await getSession();
      accessToken = session?.accessToken;
      // accessToken = clientToken || LocalStorage.get("accessToken") || undefined;
    }
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (!url.includes(API_CONSTANTS.TOKEN) && accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const options = {
    method,
    url,
    headers,
    ...(method !== API_METHODS.GET && { data: payload }),
  };

  try {
    const response = await axios(options);
    callback(response.data);
  } catch (error: any) {
    if (error?.response?.status === 400) {
      callback(error.response.data);
      return;
    }
    callback(error);
  }
};
