import React, { useEffect } from "react";
import styles from "./chatSession.module.scss";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import ChatFlow from "../chatFlow/chatFlow";

interface ChatSessionProps {
  chatSessionData?: any;
  chatAIProfileData?: any;
  chatList: any[];
  handleSendBtnClick: (promptText: string) => void;
  promptText: string;
  setPromptText: (promptText: string) => void;
}

const ChatSession: React.FC<ChatSessionProps> = ({
  chatSessionData,
  chatAIProfileData,
  chatList,
  promptText,
  setPromptText,
  handleSendBtnClick,
}) => {
  const handleBottomInputOncChange = (e: any) => {
    setPromptText(e.target.value);
  };

  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
      handleSendBtnClick(promptText);
    }
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`${styles.ChatSession} ${
        !(chatList && chatList?.length > 0)
          ? styles.ChatSession_initial_content
          : ""
      }`}
    >
      {chatList && chatList?.length > 0 ? (
        <ChatFlow chatList={chatList} />
      ) : (
        <div className={styles.ChatSession_chat_details_wrapper}>
          <p className={styles.ChatSession_chat_details_title}>
            {chatAIProfileData && chatAIProfileData?.name
              ? chatAIProfileData?.name
              : "Welcome to AI Chat"}
          </p>
          <p className={styles.ChatSession_chat_details_description}>
            Get Startted
          </p>
        </div>
      )}
      <div className={styles.ChatSession_bottom_wrapper}>
        <div className={styles.ChatSession_bottom_content}>
          <Input
            className={styles.ChatSession_prompt_input_box}
            value={promptText}
            onChange={handleBottomInputOncChange}
            placeholder="Enter prompt here..."
            onKeyDown={handleEnterKey}
          />
          <Button
            className={styles.ChatSession_send_btn}
            content="Send"
            onClick={() => {
              handleSendBtnClick(promptText);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSession;
