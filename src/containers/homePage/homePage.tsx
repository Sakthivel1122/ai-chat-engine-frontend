"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { streamChatWithFetch } from "@/utils/sharedFunctions";
import Loader from "@/components/loader/loader";
import { BREAK_POINTS } from "@/constants/app-constants";

interface HomePageProps {}
let count = 0;

type TgetChatSessionListPayload = {
  page_no: number,
  page_size: number
}
const HomePage: React.FC<HomePageProps> = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const dispatch = useDispatch();

  const [aiProfileList, setAiProfileList] = useState([]);
  const [chatSessionList, setChatSessionList] = useState([]);
  const [streamedText, setStreamedText] = useState("");

  // chat
  const [chatSessionData, setChatSessionData] = useState<any>({});
  const [chatAIProfileData, setChatAIProfileData] = useState<any>({});
  const [chatList, setChatList] = useState<any>([]);
  const [promptText, setPromptText] = useState("");
  const [chatSessionListPageSize, setChatSessionListPageSize] = useState<any>(15);
  const [sendBtnIsLoading, setSendBtnIsLoading] = useState<boolean>(false);
  const [chatSessionScrollLoader, setChatSessionScrollLoader] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState<number>();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const chatSessionTotalPageRef = useRef(0);
  const chatSessionCurrectPageRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    dispatch(setUserName(`user ${count}`));
    count++;
  };

  const handleChatSessiOnClick = (data: any) => {
    setChatSessionData(data);
    updateChatList(data?.session_id);
    setShowSideBar(false);
  };

  const handleNewChatOnClick = () => {
    setChatSessionData({});
    setChatAIProfileData({});
    setChatList([]);
    setShowSideBar(false);
  };

  const handleAIProfileOnClick = (data: any) => {
    setChatAIProfileData(data);
    setChatSessionData({});
    setChatList([]);
    setShowSideBar(false);
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

  const handleSendBtnClick = async (promptText: string) => {
    setSendBtnIsLoading(true);
    setLoadingMessage(promptText);
    setPromptText("");

    let payload: any = {
      message: promptText,
    };

    if (chatSessionData && chatSessionData?.session_id) {
      payload.chat_session_id = chatSessionData?.session_id;
    } else if (chatAIProfileData && chatAIProfileData?.id) {
      payload.ai_profile_id = chatAIProfileData?.id;
    }

    payload.chat_type = "stream";

    let once = true;
    let chunkCount = 0;

    try {
      await streamChatWithFetch(payload, (chunk) => {
        chunkCount++;
        setStreamedText((prev) => prev + chunk);

        let tempArr = chatList;

        if (once) {
          tempArr.push({
            sender: "bot",
            message: "",
          });
          once = false;
        }
        const len = tempArr.length - 1;
        let newMsg = tempArr[len].message + chunk;
        tempArr[len].message = newMsg;
        setChatList(tempArr);
        if (chunkCount === 5) {
          const el = scrollRef.current;
          if (el) {
            const currentScroll = el.scrollTop;
            el.scrollTo({
              top: currentScroll + 50,
              behavior: "smooth",
            });
          }
        }
      }, (meta) => {
        // setSendBtnIsLoading(false);
        setLoadingMessage("");
        setPromptText("");
        const sessionId = meta?.chat_session_id;

        const tempArr = chatList;
        tempArr.push({
          sender: "human",
          message: meta?.user_message
        });
        setChatList(tempArr);

        // updateChatList(sessionId);
        if (!payload?.chat_session_id) {
          const payload = {
            page_no: 1,
            page_size: chatSessionListPageSize
          }
          updateChatSessionList(payload, true);
          const params = `?session_id=${sessionId}`;
          getChatSessionDataApi(params, (res) => {
            if (res.response.status === 200) {
              const sessionData = res?.content;
              setChatSessionData(sessionData);
            }
          });
        }
      }).catch((error) => {
        setSendBtnIsLoading(false);
        setLoadingMessage("");
      })
      setSendBtnIsLoading(false);
    } catch (err) {
      console.error("Streaming failed:", err);
    }

    // sendMessageApi(payload, (res) => {
    //   if (res.response.status === 200) {
    //     const sessionId = res?.content?.chat_session_id;
    //     updateChatList(sessionId);
    //     setPromptText("");
    //     if (!payload?.chat_session_id) {
    //       updateChatSessionList();
    //       const params = `?${sessionId}`;
    //       getChatSessionDataApi(params, (res) => {
    //         if (res.response.status === 200) {
    //           const sessionData = res?.content;
    //           setChatSessionData(sessionData);
    //         }
    //       });
    //     }
    //   } else {
    //   }
    // });
  };

  const updateChatSessionList = (payload: TgetChatSessionListPayload, reset: boolean) => {
    getChatSessionListApi(payload, (res) => {
      if (res.response.status === 200) {
        if (res?.content?.data) {
          if (reset) {
            setChatSessionList(res?.content?.data);
          } else {
            setChatSessionList((prev):any => {
              return [...prev, ...res?.content?.data]
            });
          }
        }
        chatSessionCurrectPageRef.current = payload?.page_no;
        chatSessionTotalPageRef.current = res?.content?.total_pages;
        setChatSessionScrollLoader(false);
      } else {
        setChatSessionScrollLoader(false);
      }
    });
  };

  const handleScrollEnd = () => {
    if (chatSessionCurrectPageRef.current < chatSessionTotalPageRef.current) {
      setChatSessionScrollLoader(true);
      const payload = {
        page_no: chatSessionCurrectPageRef.current + 1,
        page_size: chatSessionListPageSize,
      }
      updateChatSessionList(payload, false);
    } else {
      setChatSessionScrollLoader(false);
    }
  }

  const handleToggleSideBar = () => {
    setShowSideBar(!showSideBar);
  }

  const handleOutsideClick = (e:any) => {
    if (e.target.id === "SideBarWrapper") {
      setShowSideBar(false);
    }
  }

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth", // <-- smooth scroll
      });
    }
  }

  useEffect(() => {
    if (loadingMessage) {
      scrollToBottom();
    }
  } ,[loadingMessage]);

  useEffect(() => {
    getAIProfileListApi((res) => {
      if (res.response.status === 200) {
        setAiProfileList(res?.content);
      } else {
      }
    });
    const payload = {
      page_no: 1,
      page_size: chatSessionListPageSize
    }
    updateChatSessionList(payload, true);
  }, []);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    const handleUpdateWidth = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleUpdateWidth);
    return () => {
      window.removeEventListener("resize", handleUpdateWidth);
    };
  }, []);

  return (
    <div className={styles.HomePage}>
      {/* <div style={{display: "flex", flexDirection: "column"}}>
      <p>{streamedText}</p>
      <Button content="Send" onClick={() => {
        handleSendBtnClick("Hello");
      }}/>
      </div> */}
      {/* <Loader /> */}

      {innerWidth && ((innerWidth && innerWidth <= BREAK_POINTS.LARGE)
        ? <>
            <div
              className={`${styles.HomePage_sidebar_wrapper} ${showSideBar ? styles.open : ""}`}
              id="SideBarWrapper" 
              onClick={handleOutsideClick}
            />
            <UserSideBar
              aiProfileList={aiProfileList}
              chatSessionList={chatSessionList}
              className={`${styles.HomePage_sidebar} ${showSideBar ? styles.open : ""}`}
              chatSessionId={chatSessionData?.session_id}
              handleNewChatOnClick={handleNewChatOnClick}
              handleChatSessiOnClick={handleChatSessiOnClick}
              handleAIProfileOnClick={handleAIProfileOnClick}
              handleScrollEnd={handleScrollEnd}
              showChatSessionScrollLoader={chatSessionScrollLoader}
              handleCloseBtnClick={handleToggleSideBar}
            />
          </>
        : <UserSideBar
            aiProfileList={aiProfileList}
            chatSessionList={chatSessionList}
            className={styles.HomePage_sidebar}
            chatSessionId={chatSessionData?.session_id}
            handleNewChatOnClick={handleNewChatOnClick}
            handleChatSessiOnClick={handleChatSessiOnClick}
            handleAIProfileOnClick={handleAIProfileOnClick}
            handleScrollEnd={handleScrollEnd}
            showChatSessionScrollLoader={chatSessionScrollLoader}
            handleCloseBtnClick={handleToggleSideBar}
          />)}

      <div className={styles.HomePage_content_right}>
        <NavBar
          className={styles.HomePage_navbar}
          handleBurgerIconOnClick={handleToggleSideBar}
        />
        <ChatSession
          chatSessionData={chatSessionData}
          chatAIProfileData={chatAIProfileData}
          chatList={chatList}
          handleSendBtnClick={handleSendBtnClick}
          promptText={promptText}
          setPromptText={setPromptText}
          sendBtnIsLoading={sendBtnIsLoading}
          loadingMessage={loadingMessage}
          scrollRef={scrollRef}
        />
      </div>
    </div>
  );
};

export default HomePage;
