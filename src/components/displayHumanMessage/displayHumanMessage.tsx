import React from "react";
import styles from "./displayHumanMessage.module.scss";

interface DisplayHumanMessageProps {
  message: string;
}

const DisplayHumanMessage: React.FC<DisplayHumanMessageProps> = ({
  message,
}) => {
  return <div className={styles.DisplayHumanMessage}>{message}</div>;
};

export default DisplayHumanMessage;
