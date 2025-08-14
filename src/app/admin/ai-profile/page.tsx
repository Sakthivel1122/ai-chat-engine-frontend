"use client";
import { getAIProfileListApi } from "@/app/api/chat/chat";
import Table from "@/components/Table/table";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/button/button";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Input from "@/components/input/input";
import CreateAIProfilePopup from "@/containers/admin/createAIProfilePopup/createAIProfilePopup";
import { createAiProfileApi, deleteAiProfileApi } from "@/app/api/admin/admin";
import { aiProfileSubmitData } from "@/types/aiProfile";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";
import ConfirmPopup from "@/components/confirmPopup/confirmPopup";

const AiProfile = () => {
  const [searchText, setSearchText] = useState("");
  const [aiProfileList, setAiProfileList] = useState([]);
  const [confirmPopup, setConfirmPopup] = useState({ show: false, data: null });
  const [aiProfilePopup, setAiProfilePopup] = useState<{
    show: boolean;
    data: null | Object;
  }>({
    show: false,
    data: null,
  });

  const handleAction = (row: any) => {};

  const handleSubmitClick = (data: aiProfileSubmitData) => {
    let payload: any = {
      name: data.name,
      system_prompt: data.systemPrompt,
      is_active: data.isActive,
    };

    if (data?.id) {
      payload.id = data.id;
    }
    createAiProfileApi(payload, (res: any) => {
      try {
        if (res?.response?.status === 200) {
          updateAiProfileList();
          handleClosePopup();
          alertMessage(res?.response?.message, ALERT_TYPE.SUCCESS);
        } else {
          alertMessage(res?.response?.message, ALERT_TYPE.ERROR);
        }
      } catch (error) {
        console.log("create ai profile error: ", error);
      }
    });
  };

  const handleEditClick = (data: any) => {
    const dataObj = {
      id: data?.id,
      name: data?.name,
      system_prompt: data?.system_prompt,
      is_active: data?.is_active,
    };

    setAiProfilePopup({
      show: true,
      data: dataObj,
    });
  };

  const handleDeleteClick = (data: any) => {
    setConfirmPopup({ show: true, data: data });
  };

  const handleConfirmDelete = () => {
    const data: any = confirmPopup.data;
    if (data && data?.id) {
      const params = `?ai_profile_id=${data?.id}`;
      deleteAiProfileApi(params, (res) => {
        if (res?.response?.status === 200) {
          updateAiProfileList();
          setConfirmPopup({ show: false, data: null });
          alertMessage(res?.response?.message, ALERT_TYPE.SUCCESS);
        } else {
          alertMessage(res?.response?.message, ALERT_TYPE.ERROR);
        }
      });
    } else {
      alertMessage("Unable to delete", ALERT_TYPE.WARNING);
    }
  };

  const closeConfirmPopup = () => {
    setConfirmPopup({show: false, data: null});
  }

  const handeCreateOnclick = () => {
    setAiProfilePopup({
      show: true,
      data: null,
    });
  };

  const handleClosePopup = () => {
    setAiProfilePopup({
      show: false,
      data: null,
    });
  };

  useEffect(() => {
    updateAiProfileList();
  }, []);

  const updateAiProfileList = (showSuccessMsg: boolean = false) => {
    getAIProfileListApi((res) => {
      if (res?.response?.status === 200) {
        const list = res?.content.map((data: any, index: number) => {
          // data.is_active_text = JSON.stringify(data?.is_active);
          data.is_active_text = data?.is_active ? "Yes" : "No";
          data.s_no = index + 1;

          return data;
        });
        setAiProfileList(list);
        if (showSuccessMsg) {
          alertMessage(res?.response?.message, ALERT_TYPE.SUCCESS);
        }
      } else {
        alertMessage(res?.response?.message, ALERT_TYPE.ERROR);
      }
    });
  };

  return (
    <>
      <div className={styles.AiProfile}>
        <div className={styles.AiProfile_head}>
          <h1 className={styles.AiProfile_title}>AI Profile Manager</h1>
        </div>
        <div className={styles.AiProfile_search_wrapper}>
          <Input
            className={styles.AiProfile_search_box}
            value={searchText}
            placeholder="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <Button
            className={styles.AiProfile_create_btn}
            onClick={handeCreateOnclick}
          >
            <IoMdAdd />
            <p>Create</p>
          </Button>
        </div>
        <Table
          columns={[
            { key: "s_no", header: "S.No" },
            { key: "name", header: "Name" },
            {
              key: "system_prompt",
              header: "System Prompt",
              customClass: styles.AiProfile_system_prompt_text,
              showTitle: true,
            },
            {
              key: "is_active_text",
              header: "Is Active",
            },
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <div className={styles.AiProfile_actions}>
                  <FaRegEdit
                    className={styles.AiProfile_actions_icon}
                    onClick={() => {
                      handleEditClick(row);
                    }}
                  />
                  <MdOutlineDeleteOutline
                    className={styles.AiProfile_actions_icon}
                    onClick={() => {
                      handleDeleteClick(row);
                    }}
                  />
                </div>
              ),
            },
          ]}
          data={aiProfileList ? aiProfileList : []}
        />
      </div>

      {aiProfilePopup?.show && (
        <CreateAIProfilePopup
          data={aiProfilePopup.data}
          onClose={handleClosePopup}
          onSubmit={handleSubmitClick}
        />
      )}
      {confirmPopup.show && (
        <ConfirmPopup
          title="Are you Sure?"
          cancelBtnText="No"
          confirmBtnText="Yes"
          onConfirm={handleConfirmDelete}
          onCancel={closeConfirmPopup}
          onClose={closeConfirmPopup}
        />
      )}
    </>
  );
};

export default AiProfile;
