"use client";
import React, { useEffect, useState } from "react";
import styles from "./navBar.module.scss";
import { getSession } from "next-auth/react";
import UserIcon from "@/components/userIcon/userIcon";
import UserProfileDropdown from "../userProfileDropdown/userProfileDropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { BREAK_POINTS } from "@/constants/app-constants";

interface NavBarProps {
  className?: string;
  handleBurgerIconOnClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ className, handleBurgerIconOnClick }) => {
  const [userName, setUserName] = useState<string | null>();
  const [userEmailId, setUserEmailId] = useState<string | null>();
  const [openProfileDropdown, setOpenProfileDropdown] =
    useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState<number>();

  useEffect(() => {
    initialContentUpdate();
  }, []);

  const initialContentUpdate = async () => {
    const session = await getSession();
    setUserName(session?.user?.name);
    setUserEmailId(session?.user?.email);
  };

  const handleUserIconOnClick = () => {
    setOpenProfileDropdown(!openProfileDropdown);
  };

  const handleDropdownClose = () => {
    setOpenProfileDropdown(false);
  };

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    const handleUpdateWidth = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleUpdateWidth);
    return () => {
      window.removeEventListener("resize", handleUpdateWidth);
    };
  }, []);

  return (
    <div className={`${styles.NavBar} ${className}`}>
      <div className={styles.NavBar_content_left}>
        {(innerWidth && innerWidth <= BREAK_POINTS.LARGE) &&
          <RxHamburgerMenu
            size={22}
            onClick={() => {
              handleBurgerIconOnClick()
            }}
          />}
      </div>
      <div className={styles.NavBar_content_right}>
        <UserIcon
          letter={userName ? userName[0].toUpperCase() : ""}
          onClick={handleUserIconOnClick}
        />
        {openProfileDropdown && (
          <UserProfileDropdown
            className={styles.NavBar_user_profile_dropdown}
            userName={userName ? userName : ""}
            emailId={userEmailId ? userEmailId : ""}
            isOpen={openProfileDropdown}
            handleClose={handleDropdownClose}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
