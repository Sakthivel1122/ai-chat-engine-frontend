import React, { useState } from "react";
import styles from "./userSideBar.module.scss";
import Logo from "@/components/logo/logo";
import { APP_DATA } from "@/constants/app-constants";
import Input from "@/components/input/input";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoChatbubbleSharp } from "react-icons/io5";
import ChatItem from "@/components/chatItem/chatItem";

interface UserSideBarProps {
  aiProfileList?: object[] | any;
  chatSessionList?: object[] | any;
  className?: string;
  chatSessionId: string;
  handleChatSessiOnClick: (data: any) => void;
  handleNewChatOnClick: () => void;
  handleAIProfileOnClick: (data: any) => void;
}

const UserSideBar: React.FC<UserSideBarProps> = ({
  aiProfileList,
  chatSessionList,
  className,
  chatSessionId,
  handleChatSessiOnClick,
  handleNewChatOnClick,
  handleAIProfileOnClick,
}) => {
  const [search, setSearch] = useState("");

  const handleOnSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleChatOnClick = (data: any) => {
    handleChatSessiOnClick(data);
  };

  return (
    <div className={`${styles.UserSideBar} ${className}`}>
      <div className={styles.UserSideBar_logo_container}>
        <Logo
          customClassWrapper={styles.UserSideBar_custom_logo_wrapper}
          className={styles.UserSideBar_logo}
        />
        <p className={styles.UserSideBar_app_name_text}>{APP_DATA.name}</p>
      </div>

      <div className={styles.UserSideBar_search_container}>
        <Input
          placeholder="Search"
          value={search}
          onChange={handleOnSearchChange}
        />
      </div>

      <div className={styles.UserSideBar_section_wrapper}>
        <div className={styles.UserSideBar_chat_container}>
          <p className={styles.UserSideBar_title_text}>START NEW CHAT</p>
          <div className={styles.UserSideBar_chat_item_wrapper}>
            <ChatItem
              icon="add"
              data={{}}
              label={"New Chat"}
              onClick={() => {
                handleNewChatOnClick();
              }}
            />
            {aiProfileList &&
              aiProfileList.map((data: any, index: number) => (
                <ChatItem
                  icon="add"
                  data={data}
                  label={data?.name}
                  onClick={() => {
                    handleAIProfileOnClick(data);
                  }}
                  key={index}
                />
              ))}
          </div>
        </div>

        <div className={styles.UserSideBar_chat_scrollable_wrapper}>
          <div className={styles.UserSideBar_chat_container}>
            <p className={styles.UserSideBar_title_text}>RECENT CHATS</p>
            <div
              className={`${styles.UserSideBar_chat_item_wrapper} ${styles.UserSideBar_chat_sessions_wrapper}`}
            >
              {chatSessionList &&
                chatSessionList.map((data: any, index: number) => (
                  <ChatItem
                    key={index}
                    icon="none"
                    data={data}
                    label={data?.title}
                    onClick={() => {
                      handleChatOnClick(data);
                    }}
                    isActive={chatSessionId === data?.session_id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
