import React, { useEffect } from "react";
import styles from "./chatSession.module.scss";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import ChatFlow from "../chatFlow/chatFlow";
import GrowingTextarea from "@/components/growingTextarea/growingTextarea";
import { FaArrowUp } from "react-icons/fa6";

interface ChatSessionProps {
  chatSessionData?: any;
  chatAIProfileData?: any;
  chatList: any[];
  handleSendBtnClick: (promptText: string) => void;
  promptText: string;
  setPromptText: (promptText: string) => void;
  sendBtnIsLoading?: boolean;
  loadingMessage: string;
  scrollRef: any;
}

const ChatSession: React.FC<ChatSessionProps> = ({
  chatSessionData,
  chatAIProfileData,
  chatList,
  promptText,
  setPromptText,
  handleSendBtnClick,
  sendBtnIsLoading,
  loadingMessage,
  scrollRef,
}) => {
  const handleBottomInputOncChange = (e: any) => {
    setPromptText(e);
  };

  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
      handleSendBtnClick(promptText);
    }
  };

  useEffect(() => {}, []);

  const isNewChat = !((chatList && chatList?.length > 0) || loadingMessage);

  return (
    <div
      className={`${styles.ChatSession} ${
        isNewChat
          ? styles.ChatSession_initial_content
          : ""
      }`}
    >
      {((chatList && chatList?.length > 0) || loadingMessage) ? (
        <ChatFlow 
          chatList={chatList} 
          loadingMessage={loadingMessage}
          scrollRef={scrollRef}
        />
      ) : (
        <div className={styles.ChatSession_chat_details_wrapper}>
          <p className={styles.ChatSession_chat_details_title}>
            {chatAIProfileData && chatAIProfileData?.name
              ? chatAIProfileData?.name
              : "What's on your mind today?"}
          </p>
          <p className={styles.ChatSession_chat_details_description}>
            Get Startted
          </p>
        </div>
      )}
      <div className={styles.ChatSession_bottom_wrapper}>
        <div className={`${styles.ChatSession_bottom_content} ${isNewChat ? styles.ChatSession_bottom_content_pos_top : ""}`}>
          <GrowingTextarea
            className={styles.ChatSession_prompt_input_box}
            value={promptText}
            onChange={handleBottomInputOncChange}
            placeholder="Enter prompt here..."
            onSubmit={() => {
              if (promptText && !sendBtnIsLoading) {
                handleSendBtnClick(promptText);
              }
            }}
          />
          <Button
            className={styles.ChatSession_send_btn}
            onClick={() => {
              if (promptText && !sendBtnIsLoading) {
                handleSendBtnClick(promptText);
              }
            }}
            disabled={!sendBtnIsLoading ? (promptText ? false : true) : true}
            isLoading={sendBtnIsLoading}
            loaderSize={14}
          >
            <FaArrowUp size={14}/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSession;
