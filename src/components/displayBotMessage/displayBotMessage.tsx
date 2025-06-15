import React from "react";
import styles from "./displayBotMessage.module.scss";
import ReactMarkdown from "react-markdown";

interface DisplayBotMessageProps {
  message: string;
}

const DisplayBotMessage: React.FC<DisplayBotMessageProps> = ({ message }) => {
  return (
    <div className={styles.DisplayBotMessage}>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
};

export default DisplayBotMessage;
