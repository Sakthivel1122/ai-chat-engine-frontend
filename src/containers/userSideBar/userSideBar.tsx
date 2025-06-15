import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./userSideBar.module.scss";
import Logo from "@/components/logo/logo";
import { APP_DATA } from "@/constants/app-constants";
import Input from "@/components/input/input";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoChatbubbleSharp } from "react-icons/io5";
import ChatItem from "@/components/chatItem/chatItem";
import { debounce } from "@/utils/sharedFunctions";
import Loader from "@/components/loader/loader";
import { IoClose } from "react-icons/io5";

interface UserSideBarProps {
  aiProfileList?: object[] | any;
  chatSessionList?: object[] | any;
  className?: string;
  chatSessionId: string;
  showChatSessionScrollLoader: boolean;
  handleChatSessiOnClick: (data: any) => void;
  handleNewChatOnClick: () => void;
  handleAIProfileOnClick: (data: any) => void;
  handleScrollEnd: () => void;
  handleCloseBtnClick: (e: any) => void;
}

const UserSideBar: React.FC<UserSideBarProps> = ({
  aiProfileList,
  chatSessionList,
  className,
  chatSessionId,
  showChatSessionScrollLoader,
  handleChatSessiOnClick,
  handleNewChatOnClick,
  handleAIProfileOnClick,
  handleScrollEnd,
  handleCloseBtnClick,
}) => {
  const [search, setSearch] = useState("");

  const handleOnSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleChatOnClick = (data: any) => {
    handleChatSessiOnClick(data);
  };

  const chatSessionScrollRef = useRef<HTMLDivElement>(null);


  const checkScrollPosition = (): void => {
    const element = chatSessionScrollRef.current;

    if (element) {
      const scrollThreshold = 5;

      if (
        element.scrollTop + element.clientHeight >=
        element.scrollHeight - scrollThreshold
      ) {
        console.log("handleScrollEnd 1")
        handleScrollEnd?.();
      }
    }
  };

  const debouncedHandleScroll = useCallback(
    debounce(checkScrollPosition, 200),
    [checkScrollPosition]
  );

  useEffect(() => {
    
    const element = chatSessionScrollRef.current;

    if (element) {
      // Attach the scroll event listener
      element.addEventListener("scroll", debouncedHandleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
        element.removeEventListener("scroll", debouncedHandleScroll);
      };
    }
  }, []);

  return (
    <div className={`${styles.UserSideBar} ${className}`}>
      <div className={styles.UserSideBar_logo_container}>
        <Logo
          customClassWrapper={styles.UserSideBar_custom_logo_wrapper}
          className={styles.UserSideBar_logo}
        />
        <p className={styles.UserSideBar_app_name_text}>{APP_DATA.name}</p>
        <IoClose className={styles.UserSideBar_close_btn} size={24} onClick={handleCloseBtnClick}/>
      </div>

      <div className={styles.UserSideBar_search_container}>
        <ChatItem
          className={styles.UserSideBar_new_chat}
          icon="add"
          data={{}}
          label={"New Chat"}
          onClick={() => {
            handleNewChatOnClick();
          }}
        />
      </div>

      <div className={styles.UserSideBar_section_wrapper}>
        <div className={styles.UserSideBar_chat_container}>
          <p className={styles.UserSideBar_title_text}>START NEW CHAT WITH</p>
          <div className={styles.UserSideBar_chat_item_wrapper}>
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
              ref={chatSessionScrollRef}
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
                {showChatSessionScrollLoader &&
                  <div className={styles.UserSideBar_scroll_loader_wrapper}>
                    <Loader />
                  </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
