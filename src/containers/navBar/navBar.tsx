"use client";
import React, { useEffect, useState } from "react";
import styles from "./navBar.module.scss";
import { getSession } from "next-auth/react";
import UserIcon from "@/components/userIcon/userIcon";
import UserProfileDropdown from "../userProfileDropdown/userProfileDropdown";

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  const [userName, setUserName] = useState<string | null>();
  const [userEmailId, setUserEmailId] = useState<string | null>();
  const [openProfileDropdown, setOpenProfileDropdown] =
    useState<boolean>(false);

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

  return (
    <div className={`${styles.NavBar} ${className}`}>
      <div className={styles.NavBar_content_left}></div>
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
