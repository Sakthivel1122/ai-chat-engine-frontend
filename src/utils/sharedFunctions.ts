import { getSession, signOut } from "next-auth/react";
import { LocalStorage } from "./storage";
import { API_CONSTANTS } from "@/constants/api-constants";

export const handleLogout = async (redirectionUrl?: string) => {
  if (redirectionUrl) {
    await signOut({ callbackUrl: redirectionUrl });
  } else {
    await signOut({ redirect: false });
  }
};

export const streamChatWithFetch = async (
  payload: any,
  onChunk: (chunk: string) => void,
  onMeta?: (meta: any) => void
): Promise<void> => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(API_CONSTANTS.SEND_MESSAGE, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok || !response.body) {
    throw new Error("Streaming failed.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let isFirstChunk = true;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });

    if (isFirstChunk) {
      isFirstChunk = false;
      if (chunk.startsWith("[META]")) {
        const newlineIndex = chunk.indexOf("\n");
        const metaString = chunk.slice(6, newlineIndex); // skip "[META]"
        const meta = JSON.parse(metaString);
        onMeta?.(meta); // call optional metadata callback

        const rest = chunk.slice(newlineIndex + 1); // remaining content
        if (rest) onChunk(rest);
        continue;
      }
    }

    onChunk(chunk);
  }
};

type Timer = ReturnType<typeof setTimeout>;

  export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T {
    let timer: Timer | undefined;

    return function (this: any, ...args: Parameters<T>) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
    } as T;
  }