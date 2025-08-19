import React from "react";
import styles from "./chatFlow.module.scss";
import DisplayHumanMessage from "@/components/displayHumanMessage/displayHumanMessage";
import DisplayBotMessage from "@/components/displayBotMessage/displayBotMessage";
import ThreeDotLoader from "@/components/threeDotLoader/threeDotLoader";

interface ChatFlowProps {
  chatList: any[];
  loadingMessage?: string;
  scrollRef: any;
}

const ChatFlow: React.FC<ChatFlowProps> = ({
  chatList,
  loadingMessage,
  scrollRef,
}) => {
  return (
    <div className={styles.ChatFlow} ref={scrollRef}>
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
        {loadingMessage && (
          <div className={styles.ChatFlow_loader_wrapper}>
            <ThreeDotLoader size={12} color="#9249e7" speed={1.2} />
            <DisplayHumanMessage message={loadingMessage || ""} />
          </div>          
        )}
      </div>
    </div>
  );
};

export default ChatFlow;
