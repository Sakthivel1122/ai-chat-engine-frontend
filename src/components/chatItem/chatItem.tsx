import React from "react";
import styles from "./chatItem.module.scss";
import { IoChatbubbleSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

interface ChatItemProps {
  data: any;
  label: string;
  icon?: "add" | "chat" | "none";
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

const ChatItem: React.FC<ChatItemProps> = ({
  data,
  label,
  icon,
  onClick,
  isActive,
  className,
}) => {
  return (
    <div
      className={`${styles.ChatItem} ${className} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      title={label}
    >
      {icon === "add" ? (
        <IoMdAddCircleOutline className={styles.ChatItem_add_icon} />
      ) : icon === "chat" ? (
        <IoChatbubbleSharp className={styles.ChatItem_add_icon} />
      ) : null}
      <p className={styles.ChatItem_label}>{label}</p>
    </div>
  );
};

export default ChatItem;
