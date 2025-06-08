// utils/storage.ts
import Cookies from "cookies";
import type { IncomingMessage, ServerResponse } from "http";

/* Helper to parse JSON safely */
function parseJson<T>(str: string): T | null {
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    return null;
  }
}

/* Session Storage */
function setSession(key: string, value: any): void {
  let parsedVal = value;
  if (parsedVal && typeof value !== "string") {
    parsedVal = JSON.stringify(parsedVal);
  }
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, parsedVal);
  }
}

function getSession<T = any>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(key);
  if (!value) return null;
  return parseJson<T>(value);
}

function removeSession(key: string): void {
  if (typeof window !== "undefined" && sessionStorage.getItem(key)) {
    sessionStorage.removeItem(key);
  }
}

/* Cookie Storage */
function setCookie(
  req: IncomingMessage,
  res: ServerResponse,
  cookieName: string,
  cookieValue: string,
  options: Cookies.SetOption = {}
): void {
  const cookies = new Cookies(req, res);
  const defaultOptions = {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
  };
  const finalOptions = { ...defaultOptions, ...options };
  cookies.set(cookieName, cookieValue, finalOptions);
}

function getCookie(
  req: IncomingMessage,
  res: ServerResponse,
  cookieName: string
): string | undefined {
  const cookies = new Cookies(req, res);
  return cookies.get(cookieName);
}

function removeCookie(
  req: IncomingMessage,
  res: ServerResponse,
  cookieName: string
): void {
  const cookies = new Cookies(req, res);
  cookies.set(cookieName); // No value removes the cookie
}

/* Local Storage */
function setLocal(key: string, value: any): void {
  let parsedVal = value;
  if (parsedVal && typeof value !== "string") {
    parsedVal = JSON.stringify(parsedVal);
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(key, parsedVal);
  }
}

function getLocal<T = any>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const localVal = localStorage.getItem(key);
  return localVal ? parseJson<T>(localVal) : null;
}

function removeLocal(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

const SessionStorage = {
  set: setSession,
  get: getSession,
  remove: removeSession,
};

const CookieStorage = {
  set: setCookie,
  get: getCookie,
  remove: removeCookie,
};

const LocalStorage = {
  set: setLocal,
  get: getLocal,
  remove: removeLocal,
};

export { SessionStorage, CookieStorage, LocalStorage };
