import React from "react";
import styles from "./adminLayout.module.scss";
import AdminSideBar from "@/containers/adminSideBar/adminSideBar";
import AdminNavBar from "@/containers/adminNavBar/adminNavBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className={styles.AdminLayout}>
      <AdminSideBar />
      <div className={styles.AdminLayout_content}>
        <AdminNavBar />
        <div className={styles.AdminLayout_content_wrapper}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
