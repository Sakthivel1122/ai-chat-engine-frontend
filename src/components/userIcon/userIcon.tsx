import React from "react";
import styles from "./userIcon.module.scss";

interface UserIconProps {
  letter: string;
  onClick: () => void;
}

const UserIcon: React.FC<UserIconProps> = ({ letter, onClick }) => {
  return (
    <div className={styles.UserIcon} onClick={onClick}>
      {letter}
    </div>
  );
};

export default UserIcon;
