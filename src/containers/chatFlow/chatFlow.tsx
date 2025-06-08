import React from "react";
import styles from "./chatFlow.module.scss";
import DisplayHumanMessage from "@/components/displayHumanMessage/displayHumanMessage";
import DisplayBotMessage from "@/components/displayBotMessage/displayBotMessage";

interface ChatFlowProps {
  chatList: any[];
}

const ChatFlow: React.FC<ChatFlowProps> = ({ chatList }) => {
  return (
    <div className={styles.ChatFlow}>
      <div className={styles.ChatFlow_content}>
        {chatList &&
          chatList.map((data) => (
            <div className={styles.ChatFlow_chat_wrapper}>
              {data?.sender === "human" ? (
                <DisplayHumanMessage message={data?.message} />
              ) : (
                <DisplayBotMessage message={data?.message} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatFlow;
