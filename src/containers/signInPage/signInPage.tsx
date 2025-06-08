"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./signInPage.module.scss";
import { getSession } from "next-auth/react";
import { getChatSessionListApi } from "@/app/api/chat/chat";

const SignInPage = () => {
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("user@123");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      type: "login",
    });

    if (res?.error) {
      console.log(res?.error);
      setError("Invalid email or password");
    } else if (res?.ok) {
      setError("Success");
      //   router.push("/dashboard"); // or your home page
    }
  };

  //   const data = useSession()

  useEffect(() => {
    getTokenFromSession();
  }, []);

  const getTokenFromSession = async () => {
    const session = await getSession();
    const token = session?.accessToken || null;
    console.log("token", token, session);
  };

  const callApi = () => {
    getChatSessionListApi((res) => {
      console.log("sessions", res);
    })
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Signup</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Sign In
        </button>

      </form>
    </div>
  );
};

export default SignInPage;
