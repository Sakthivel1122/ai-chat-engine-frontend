"use client";

import React from "react";
import styles from "./logo.module.scss";
import { RiRobot2Line, RiRobot2Fill } from "react-icons/ri";
import { useTheme } from "next-themes";

interface LogoProps {
  className?: string;
  customClassWrapper?: string;
}

const Logo = ({ className, customClassWrapper }: LogoProps) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.Logo_wrapper} ${customClassWrapper}`}>
      <RiRobot2Line className={`${styles.Logo} ${className}`} />
    </div>
  );
};

export default Logo;
