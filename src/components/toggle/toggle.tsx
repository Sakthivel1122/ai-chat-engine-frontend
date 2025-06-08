import React from "react";
import styles from "./toggle.module.scss";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <div
      className={`${styles.toggle} ${checked ? styles.checked : ""}`}
      onClick={() => onChange(!checked)}
    >
      <div className={styles.thumb}></div>
    </div>
  );
};

export default Toggle;
