import React, { useRef, useEffect } from "react";
import styles from "./growingTextarea.module.scss";

type GrowingTextareaProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
  onSubmit?: () => void;
};

const GrowingTextarea: React.FC<GrowingTextareaProps> = ({
  value,
  onChange,
  placeholder = "Type here...",
  minHeight = 20,
  maxHeight = 200,
  className = "",
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    console.log("textarea.scrollHeight", textarea.scrollHeight);

    textarea.style.height = "auto"; // reset height
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      onSubmit?.(); // call if defined
      console.log("submit enter");
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      className={`${styles.textarea} ${className}`}
      style={{
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
        overflowY: "auto",
      }}
    />
  );
};

export default GrowingTextarea;
