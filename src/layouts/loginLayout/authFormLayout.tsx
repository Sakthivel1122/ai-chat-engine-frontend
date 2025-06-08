import React from "react";
import styles from "./authFormLayout.module.scss";
import Logo from "@/components/logo/logo";
import { APP_DATA } from "@/constants/app-constants";

interface AuthFormLayoutProps {
  children: React.ReactNode;
  formDescription?: string;
}

const AuthFormLayout = ({
  formDescription,
  children,
}: AuthFormLayoutProps) => {
  return (
    <div className={styles.AuthFormLayout}>
      <div className={styles.AuthFormLayout_form_wrapper}>
        <div className={styles.AuthFormLayout_form_head}>
          <Logo />
          <p className={styles.AuthFormLayout_app_name}>{APP_DATA.name}</p>
          <p className={styles.AuthFormLayout_description}>{formDescription}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
