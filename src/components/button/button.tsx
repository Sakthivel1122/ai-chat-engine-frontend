// components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";
import Loader from "../loader/loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  content?: string;
  className?: string;
  isLoading?: boolean;
  loaderSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  content,
  disabled,
  className,
  isLoading,
  loaderSize = 18,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={disabled}
      {...props}
    >
      {isLoading
        ? <Loader size={loaderSize}/>
        : content ? <p>{content}</p> : children
      }
    </button>
  );
};

export default Button;
