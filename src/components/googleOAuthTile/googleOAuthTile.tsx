"use client";

import React from "react";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  CredentialResponse,
} from "@react-oauth/google";
import { useTheme } from "next-themes";

interface GoogleOAuthTileProps {
  onSuccess: (response: CredentialResponse) => void;
  onError?: () => void;
  tile_theme?: "outline" | "filled_blue" | "filled_black";
}

const GoogleOAuthTile: React.FC<GoogleOAuthTileProps> = ({
  onSuccess,
  onError = () => console.error("Google Login Failed"),
  tile_theme,
}) => {
  const { theme } = useTheme();
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "";

  if (!googleClientId) {
    console.error("Missing NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID");
    return null;
  }

  // Use passed tile_theme prop or determine it based on current theme
  const resolvedTheme =
    tile_theme || (theme === "light" ? "filled_blue" : "filled_black");

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        theme={resolvedTheme}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthTile;
