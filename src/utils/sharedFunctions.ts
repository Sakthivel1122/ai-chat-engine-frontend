import { signOut } from "next-auth/react";

export const handleLogout = async (redirectionUrl?: string) => {
  if (redirectionUrl) {
    await signOut({ callbackUrl: redirectionUrl });
  } else {
    await signOut({ redirect: false });
  }
};
