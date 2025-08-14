import React from "react";
import styles from "./layout.module.scss";
import AdminSideBar from "@/containers/adminSideBar/adminSideBar";
import AdminNavBar from "@/containers/adminNavBar/adminNavBar";
import AdminLayout from "@/layouts/adminLayout/adminLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      {/* <div className={styles.AdminLayout}>

      <AdminLayout>
        {children}
      </AdminLayout>
      <AdminSideBar />
      <div className={styles.AdminLayout_content}>
        <AdminNavBar />
        <div className={styles.AdminLayout_content_wrapper}>{children}</div>
      </div>
    </div> */}
    </>
  );
};

export default Layout;
