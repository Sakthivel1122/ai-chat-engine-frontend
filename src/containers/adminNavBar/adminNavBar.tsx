"use client";
import React, { useEffect, useState } from "react";
import styles from "./adminNavBar.module.scss";
import UserIcon from "@/components/userIcon/userIcon";
import UserProfileDropdown from "../userProfileDropdown/userProfileDropdown";
import { getSession } from "next-auth/react";

const AdminNavBar = () => {
  const [openProfileDropdown, setOpenProfileDropdown] =
    useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>();
  const [userEmailId, setUserEmailId] = useState<string | null>();

  const handleUserIconOnClick = () => {
    setOpenProfileDropdown(!openProfileDropdown);
  };

  const handleDropdownClose = () => {
    setOpenProfileDropdown(false);
  };

  useEffect(() => {
    initialContentUpdate();
  }, []);

  const initialContentUpdate = async () => {
    const session = await getSession();
    setUserName(session?.user?.name);
    setUserEmailId(session?.user?.email);
  };

  return (
    <div className={styles.AdminNavBar}>
      <p></p>
      <div className={styles.AdminNavBar_right_content}>
        <UserIcon
          letter={userName ? userName[0].toUpperCase() : ""}
          onClick={() => {
            handleUserIconOnClick();
          }}
        />
        {openProfileDropdown && (
          <UserProfileDropdown
            className={styles.AdminNavBar_user_profile_dropdown}
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

export default AdminNavBar;
