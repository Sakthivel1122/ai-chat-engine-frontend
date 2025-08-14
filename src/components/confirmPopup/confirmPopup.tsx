import React from "react";
import styles from "./confirmPopup.module.scss";
import Button from "../button/button";
import { IoClose } from "react-icons/io5";

interface ConfirmPopupProps {
  title?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
}
const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  title = "Are you sure?",
  cancelBtnText = "Cancel",
  confirmBtnText = "Confirm",
  onCancel,
  onConfirm,
  onClose,
}) => {
  return (
    <div className={styles.ConfirmPopup}>
      <div className={styles.ConfirmPopup_content}>
        <p className={styles.ConfirmPopup_title}>{title}</p>
        {onClose && (
          <div
            className={styles.ConfirmPopup_close_btn_wrapper}
            onClick={onClose}
          >
            <IoClose className={styles.ConfirmPopup_close_btn_icon} />
          </div>
        )}
        <div className={styles.ConfirmPopup_btn_wrapper}>
          {onCancel && (
            <Button
              variant="secondary"
              content={cancelBtnText}
              onClick={onCancel}
            />
          )}
          {onConfirm && <Button content={confirmBtnText} onClick={onConfirm} />}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
