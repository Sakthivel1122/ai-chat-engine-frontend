'use client';
import React from "react";
import styles from "./adminSideBarItem.module.scss";
import Link from "next/link";

interface AdminSideBarItemProps {
  label: string;
  Icon: any;
  isActive?: boolean;
  onClick: (e: any) => void;
  link: string;
}

const AdminSideBarItem: React.FC<AdminSideBarItemProps> = ({
  label,
  Icon,
  isActive,
  onClick,
  link
}) => {
  return (
    <Link
      className={`${styles.AdminSideBarItem} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      href={link}
    >
      {Icon && <Icon className={styles.AdminSideBarItem_icon} />}
      <p className={styles.AdminSideBarItem_label}>{label}</p>
    </Link>
  );
};

export default AdminSideBarItem;
