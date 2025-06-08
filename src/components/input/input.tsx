import React from "react";
import styles from "./input.module.scss";

type InputProps = {
  label?: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  required?: boolean;
  errorMsg?: string;
  autoComplete?: string;
  onKeyDown?: (e: any) => void;
};

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  className = "",
  name,
  errorMsg,
  required = false,
  autoComplete,
  onKeyDown,
}) => {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        name={name}
        required={required}
        autoComplete={autoComplete}
        onKeyDown={onKeyDown}
      />
      {errorMsg && <p className={styles.error_msg}>{errorMsg}</p>}
    </div>
  );
};

export default Input;
