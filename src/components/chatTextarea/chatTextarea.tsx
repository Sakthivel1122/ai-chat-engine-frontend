import React, {
  useRef,
  useEffect,
  useState,
  TextareaHTMLAttributes,
} from "react";
import styles from "./chatTextarea.module.scss";

interface ChatTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onEnter?: (value: string) => void; // Called when Enter (without Shift) is pressed
}

const ChatTextarea: React.FC<ChatTextareaProps> = ({ onEnter, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (onEnter) {
        onEnter(value);
        setValue("");
      }
    }
    props.onKeyDown?.(e);
  };

  return (
    <textarea
      {...props}
      className={`${styles.textarea} ${props.className || ""}`}
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      rows={1}
    />
  );
};

export default ChatTextarea;
