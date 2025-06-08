"use client";
import Input from "@/components/input/input";
import AuthFormLayout from "@/layouts/loginLayout/authFormLayout";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/button/button";
import { getSession, signIn } from "next-auth/react";
import { googleOAuthApi, loginApi } from "../api/login/login";
import { ROUTES } from "@/constants/app-constants";
import { useRouter } from "next/navigation";
import GoogleOAuthTile from "@/components/googleOAuthTile/googleOAuthTile";
import ThemeToggle from "@/components/themeToggle/themeToggle";

const LoginPage = () => {
  const [emailId, setEmailId] = useState("user1@gmail.com");
  const [password, setPassword] = useState("user@123");

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      email: emailId,
      password: password,
    };

    loginApi(payload, async (res) => {
      if (res?.response?.status === 200) {
        const userData = res.content.user_data;
        const tokenData = res.content.token;

        const result = await signIn("credentials", {
          redirect: false,
          accessToken: tokenData?.access_token,
          refreshToken: tokenData?.refresh_token,
          userId: userData?.id,
          userName: userData?.username,
          emailId: userData?.email,
          role: userData?.role,
          isLoggedIn: true,
        });

        console.log(result);

        if (result?.ok) {
          router.push(ROUTES.HOME);
        }

        // const session = await getSession();
        // const token = session?.accessToken || null;
        // console.log("token", token, session);
      } else {
      }
    });
  };

  const handleGoogleOAuthOnSuccess = (data: any) => {
    if (data?.credential) {
      const payload = {
        google_token: data?.credential,
      };
      googleOAuthApi(payload, async (res) => {
        if (res?.response?.status === 200) {
          const userData = res.content.user_data;
          const tokenData = res.content.token;

          const result = await signIn("credentials", {
            redirect: false,
            accessToken: tokenData?.access_token,
            refreshToken: tokenData?.refresh_token,
            userId: userData?.id,
            userName: userData?.username,
            emailId: userData?.email,
            role: userData?.role,
            isLoggedIn: true,
          });

          console.log(result);

          if (result?.ok) {
            router.push(ROUTES.HOME);
          }

          // const session = await getSession();
          // const token = session?.accessToken || null;
          // console.log("token", token, session);
        } else {
        }
      });
    }
  };
  return (
    <AuthFormLayout formDescription="Sign in to your account">
      <form className={styles.LoginPage}>
        <Input
          label="Email"
          placeholder="Enter email id"
          type="email"
          name="email"
          autoComplete="email"
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
        />
        <Input
          label="Password"
          placeholder="Enter password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button content="Login" onClick={handleSubmit} />

        <p className={styles.LoginPage_or_text}>or</p>

        <GoogleOAuthTile
          tile_theme="filled_blue"
          onSuccess={handleGoogleOAuthOnSuccess}
        />

        <p
          className={styles.LoginPage_link_text}
          onClick={() => {
            router.replace(ROUTES.SIGNUP);
          }}
        >
          Don't have an account? Sign up
        </p>
      </form>
    </AuthFormLayout>
  );
};

export default LoginPage;
