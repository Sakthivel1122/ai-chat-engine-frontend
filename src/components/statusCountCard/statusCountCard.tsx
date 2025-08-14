import React from "react";
import styles from "./statusCountCard.module.scss";

interface StatusCountCardProps {
  className?: string;
  Icon: any;
  title: string;
  count: string | number;
  description: string;
}
const StatusCountCard: React.FC<StatusCountCardProps> = ({
  className = "",
  Icon,
  title,
  count,
  description,
}) => {
  return (
    <div className={`${styles.StatusCountCard} ${className}`}>
      <div className={styles.StatusCountCard_head}>
        <p className={styles.StatusCountCard_title}>{title}</p>
        <Icon className={styles.StatusCountCard_icon} />
      </div>
      <p className={styles.StatusCountCard_count}>{count}</p>
      <p className={styles.StatusCountCard_description}>{description}</p>
    </div>
  );
};

export default StatusCountCard;
