"use client";
import Input from "@/components/input/input";
import AuthFormLayout from "@/layouts/loginLayout/authFormLayout";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/button/button";
import { googleOAuthApi, signUpApi } from "../api/login/login";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/app-constants";
import { signIn } from "next-auth/react";
import GoogleOAuthTile from "@/components/googleOAuthTile/googleOAuthTile";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      username: name,
      email: emailId,
      password: password,
    };
    signUpApi(payload, async (res) => {
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

        if (result?.ok) {
          if (userData?.role === "admin") {
            router.push(ROUTES.ADMIN.DASHBOARD);
          } else {
            router.push(ROUTES.HOME);
          }
        }
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
            if (userData?.role === "admin") {
              router.push(ROUTES.ADMIN.DASHBOARD);
            } else {
              router.push(ROUTES.HOME);
            }
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
    <AuthFormLayout formDescription="Create a new account">
      <form className={styles.SignUpPage}>
        <Input
          label="Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
        <Input
          label="Confirm Password"
          placeholder="Enter confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <Button className={styles.SignUpPage_signup_btn} content="Sign up" onClick={handleSubmit} />
        <p className={styles.SignUpPage_or_text}>or</p>

        <GoogleOAuthTile tile_theme="filled_blue" onSuccess={handleGoogleOAuthOnSuccess} />

        <p
          className={styles.SignUpPage_link_text}
          onClick={() => {
            router.replace(ROUTES.LOGIN);
          }}
        >
          Already have an account? Login
        </p>
      </form>
    </AuthFormLayout>
  );
};

export default SignUpPage;
