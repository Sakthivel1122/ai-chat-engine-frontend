"use client";
import React, { useState } from "react";
import styles from "./createAIProfilePopup.module.scss";
import Input from "@/components/input/input";
import Textarea from "@/components/textarea/textarea";
import Button from "@/components/button/button";
import { IoClose } from "react-icons/io5";
import { aiProfileSubmitData } from "@/types/aiProfile";
import Toggle from "@/components/toggle/toggle";

interface CreateAIProfilePopupProps {
  data: any;
  onClose: () => void;
  onSubmit: (data: aiProfileSubmitData) => void;
}

const CreateAIProfilePopup: React.FC<CreateAIProfilePopupProps> = ({
  data,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(data ? data?.name : "");
  const [systemPrompt, setSystemPrompt] = useState(
    data ? data?.system_prompt : ""
  );
  const [isActive, setIsActive] = useState(data ? data?.is_active : false);

  return (
    <div className={styles.CreateAIProfilePopup}>
      <form className={styles.CreateAIProfilePopup_form_wrapper}>
        <p className={styles.CreateAIProfilePopup_form_title}>
          Create AI Profile
        </p>
        <IoClose
          className={styles.CreateAIProfilePopup_close_btn}
          onClick={onClose}
        />
        <div className={styles.CreateAIProfilePopup_form_content}>
          <Input
            label="Name"
            placeholder="Enter name here..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Textarea
            label="System Prompt"
            placeholder="Enter system prompt here..."
            rows={data ? 20 : 10}
            value={systemPrompt}
            onChange={(e) => {
              setSystemPrompt(e.target.value);
            }}
          />
          <div className={styles.CreateAIProfilePopup_input_field_wrapper}>
            <label className={styles.CreateAIProfilePopup_label_text}>
              Is Active
            </label>
            <Toggle
              checked={isActive}
              onChange={(value) => {
                setIsActive(value);
              }}
            />
          </div>
          <div className={styles.CreateAIProfilePopup_form_btn_wrapper}>
            <Button
              variant="secondary"
              content="Cancel"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            />
            <Button
              content="Submit"
              onClick={(e) => {
                e.preventDefault();
                let dataObj: any = {
                  name,
                  systemPrompt,
                  isActive,
                };

                if (data) {
                  dataObj.id = data?.id;
                }
                onSubmit(dataObj);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAIProfilePopup;
