"use client";
import HomePage from "@/containers/homePage/homePage";
import styles from "./page.module.scss";
import { useState } from "react";
import GrowingTextarea from "@/components/growingTextarea/growingTextarea";

const Page = () => {
  const [textarea, setTextArea] = useState("");
  return (
    <>
      {/* <GrowingTextarea value={textarea} onChange={setTextArea} /> */}

      <HomePage />
    </>
  );
};

export default Page;
