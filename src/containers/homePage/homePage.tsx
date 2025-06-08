"use client";
import React, { useEffect, useState } from "react";
import styles from "./homePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Button from "@/components/button/button";
import { setUser, setUserName } from "@/store/slices/userSlice";
import UserSideBar from "@/containers/userSideBar/userSideBar";
import {
  getAIProfileListApi,
  getChatHistoryApi,
  getChatSessionDataApi,
  getChatSessionListApi,
  sendMessageApi,
} from "@/app/api/chat/chat";
import NavBar from "@/containers/navBar/navBar";
import ChatSession from "../chatSession/chatSession";

interface HomePageProps {}
let count = 0;

const HomePage: React.FC<HomePageProps> = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const dispatch = useDispatch();

  const [aiProfileList, setAiProfileList] = useState([]);
  const [chatSessionList, setChatSessionList] = useState([]);

  // chat
  const [chatSessionData, setChatSessionData] = useState<any>({});
  const [chatAIProfileData, setChatAIProfileData] = useState<any>({});
  const [chatList, setChatList] = useState([]);
  const [promptText, setPromptText] = useState("");

  const handleClick = () => {
    dispatch(setUserName(`user ${count}`));
    count++;
  };

  const handleChatSessiOnClick = (data: any) => {
    setChatSessionData(data);
    updateChatList(data?.session_id);
  };

  const handleNewChatOnClick = () => {
    setChatSessionData({});
    setChatAIProfileData({});
    setChatList([]);
  };

  const handleAIProfileOnClick = (data: any) => {
    setChatAIProfileData(data);
    setChatSessionData({});
    setChatList([]);
  };

  const updateChatList = (sessionId: string) => {
    const params = `/${sessionId}`;
    getChatHistoryApi(params, (res) => {
      if (res.response.status == 200) {
        const chat_list = res?.content?.chat_history;
        const session_id = res?.content?.session_id;
        if (chat_list) {
          setChatList(chat_list);
        }
      } else {
      }
    });
  };

  const handleSendBtnClick = (promptText: string) => {
    let payload: any = {
      message: promptText,
    };

    if (chatSessionData && chatSessionData?.session_id) {
      payload.chat_session_id = chatSessionData?.session_id;
    } else if (chatAIProfileData && chatAIProfileData?.id) {
      payload.ai_profile_id = chatAIProfileData?.id;
    }

    sendMessageApi(payload, (res) => {
      if (res.response.status === 200) {
        const sessionId = res?.content?.chat_session_id;
        updateChatList(sessionId);
        setPromptText("");
        if (!payload?.chat_session_id) {
          updateChatSessionList();
          const params = `/${sessionId}`;
          getChatSessionDataApi(params, (res) => {
            if (res.response.status === 200) {
              const sessionData = res?.content;
              setChatSessionData(sessionData);
            }
          });
        }
      } else {
      }
    });
  };

  useEffect(() => {
    getAIProfileListApi((res) => {
      if (res.response.status === 200) {
        setAiProfileList(res?.content);
      } else {
      }
    });
    updateChatSessionList();
  }, []);

  const updateChatSessionList = () => {
    getChatSessionListApi((res) => {
      if (res.response.status === 200) {
        setChatSessionList(res?.content);
      } else {
      }
    });
  };

  return (
    <div className={styles.HomePage}>
      <UserSideBar
        aiProfileList={aiProfileList}
        chatSessionList={chatSessionList}
        className={styles.HomePage_sidebar}
        chatSessionId={chatSessionData?.session_id}
        handleNewChatOnClick={handleNewChatOnClick}
        handleChatSessiOnClick={handleChatSessiOnClick}
        handleAIProfileOnClick={handleAIProfileOnClick}
      />
      <div className={styles.HomePage_content_right}>
        <NavBar className={styles.HomePage_navbar} />
        <ChatSession
          chatSessionData={chatSessionData}
          chatAIProfileData={chatAIProfileData}
          chatList={chatList}
          handleSendBtnClick={handleSendBtnClick}
          promptText={promptText}
          setPromptText={setPromptText}
        />
      </div>
    </div>
  );
};

export default HomePage;
