import React from "react";
import styles from "./displayHumanMessage.module.scss";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

interface DisplayHumanMessageProps {
  message: string;
}

const DisplayHumanMessage: React.FC<DisplayHumanMessageProps> = ({
  message,
}) => {
  return <div className={styles.DisplayHumanMessage}>
    <ReactMarkdown remarkPlugins={[remarkBreaks]}>{message}</ReactMarkdown>
  </div>;
};

export default DisplayHumanMessage;
