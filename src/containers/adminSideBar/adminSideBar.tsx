"use client";
import React, { useEffect } from "react";
import styles from "./adminSideBar.module.scss";
import Logo from "@/components/logo/logo";
import { APP_DATA } from "@/constants/app-constants";
import { adminSideBarList } from "@/constants/adminSideBar";
import AdminSideBarItem from "../adminSideBarItem/adminSideBarItem";
import { usePathname, useRouter } from "next/navigation";

const AdminSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={styles.AdminSideBar}>
      <div className={styles.AdminSideBar_logo_container}>
        <Logo
          customClassWrapper={styles.AdminSideBar_custom_logo_wrapper}
          className={styles.AdminSideBar_logo}
        />
        <p className={styles.AdminSideBar_app_name_text}>{APP_DATA.name}</p>
        {/* <IoClose
          className={styles.UserSideBar_close_btn}
          size={24}
          onClick={handleCloseBtnClick}
        /> */}
      </div>
      <div className={styles.AdminSideBar_item_wrapper}>
        {adminSideBarList.map((data) => (
          <AdminSideBarItem
            key={data.id}
            label={data.label}
            Icon={data.icon}
            isActive={pathname === data.link}
            link={data.link}
            onClick={(e) => {
              // router.push(data.link);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;
