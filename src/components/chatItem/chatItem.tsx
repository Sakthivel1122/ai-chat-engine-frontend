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
}

const ChatItem: React.FC<ChatItemProps> = ({
  data,
  label,
  icon,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={`${styles.ChatItem} ${isActive ? styles.active : ""}`}
      onClick={onClick}
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
