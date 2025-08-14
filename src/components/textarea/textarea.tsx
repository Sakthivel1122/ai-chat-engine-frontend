import React from "react";
import styles from "./textarea.module.scss";

type TextareaProps = {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  name?: string;
  required?: boolean;
  errorMsg?: string;
  autoComplete?: string;
  rows?: number;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  placeholder,
  onChange,
  className = "",
  name,
  required = false,
  errorMsg,
  autoComplete,
  rows = 4,
  maxLength,
  onKeyDown,
}) => {
  return (
    <div className={`${styles.textareaWrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.textarea}
        name={name}
        required={required}
        autoComplete={autoComplete}
        rows={rows}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
      />
      {errorMsg && <p className={styles.error_msg}>{errorMsg}</p>}
    </div>
  );
};

export default Textarea;
