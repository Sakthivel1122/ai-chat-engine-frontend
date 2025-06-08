const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_CONSTANTS = {
  LOGIN: `${BaseUrl}/authentication/api/v1/login`,
  SIGN_UP: `${BaseUrl}/authentication/api/v1/signup`,
  GOOGLE_OAUTH: `${BaseUrl}/authentication/api/v1/oauth-login`,
  REFRESH_TOKEN: `${BaseUrl}/authentication/api/v1/refresh-token`,
  TOKEN: `${BaseUrl}/token`,
  GET_CHAT_SESSION: `${BaseUrl}/ai-engine/api/v1/user/get-chat-session`,
  AI_PROFILE: `${BaseUrl}/ai-engine/api/v1/user/ai-profile`,
  SEND_MESSAGE: `${BaseUrl}/ai-engine/api/v1/user/send-message`,
  CHAT_HISTORY: `${BaseUrl}/ai-engine/api/v1/user/chat-history`,
}

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
