// components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  content?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  content,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={disabled}
      {...props}
    >
      {content ? <p>{content}</p> : children}
    </button>
  );
};

export default Button;
