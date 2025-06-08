import React, { useEffect, useRef, useState } from "react";
import styles from "./userProfileDropdown.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { MdMailOutline } from "react-icons/md";
import Toggle from "@/components/toggle/toggle";
import { useTheme } from "next-themes";
import { TbLogout } from "react-icons/tb";
import { ROUTES } from "@/constants/app-constants";
import { handleLogout } from "@/utils/sharedFunctions";

interface UserProfileDropdownProps {
  className?: string;
  userName: string;
  emailId: string;
  isOpen: boolean;
  handleClose?: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  className,
  userName,
  emailId,
  isOpen,
  handleClose,
}) => {
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogoutClick = () => {
    handleLogout(ROUTES.LOGIN);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose && handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.UserProfileDropdown} ${
        isOpen ? styles.open_dropdown : ""
      } ${className}`}
    >
      <div className={styles.UserProfileDropdown_section_1}>
        <div className={styles.item_wrapper}>
          <AiOutlineUser className={styles.item_icon} />
          <p className={styles.item_text}>{userName}</p>
        </div>
        <div className={styles.item_wrapper}>
          <MdMailOutline className={styles.item_icon} />
          <p className={styles.item_text}>{emailId}</p>
        </div>
      </div>
      <div className={styles.UserProfileDropdown_section_2}>
        <div className={styles.item_wrapper}>
          <p className={styles.item_text}>Dark Mode</p>
          <Toggle
            checked={theme === "dark"}
            onChange={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          />
        </div>
      </div>
      <div className={styles.UserProfileDropdown_section_3}>
        <div className={styles.item_wrapper} onClick={handleLogoutClick}>
          <TbLogout className={styles.item_icon} />
          <p className={styles.item_text}>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
