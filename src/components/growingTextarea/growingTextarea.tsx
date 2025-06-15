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
  minHeight = 40,
  maxHeight = 200,
  className = "",
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Store current scroll position to maintain it during resize
    const scrollTop = textarea.scrollTop;
    
    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = "auto";
    
    // Calculate the new height
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
    
    // Apply the new height
    textarea.style.height = `${newHeight}px`;
    
    // Restore scroll position
    textarea.scrollTop = scrollTop;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      resizeTextarea();
    }, 0);
    
    return () => clearTimeout(timer);
  }, [value, minHeight, maxHeight]);

  // Also resize on mount
  useEffect(() => {
    resizeTextarea();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
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
        overflowY: maxHeight && textareaRef.current && textareaRef.current.scrollHeight > maxHeight ? "auto" : "hidden",
      }}
      rows={1} // Start with single row
    />
  );
};

export default GrowingTextarea;
