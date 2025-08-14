"use client";
import React, { useEffect, useState } from "react";
import styles from "./userManagementContent.module.scss";
import Input from "@/components/input/input";
import Table from "@/components/Table/table";
import { getAllUserListApi } from "@/app/api/admin/admin";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";
import moment from "moment";

const UserManagementContent = () => {
  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    updateUserList();
  }, []);

  const updateUserList = () => {
    getAllUserListApi((res) => {
      if (res?.response?.status === 200) {
        const list = res?.content.map((data: any, index: any) => {
          const formatted = moment(data?.created_at).format(
            "DD MMM YYYY, hh:mm A"
          );

          data.formatted_datetime = formatted;
          let signUpType = "";
          switch (data.provider) {
            case "google":
              signUpType = "Google OAuth";
              break;

            default:
              signUpType = "Mail Id";
              break;
          }

          data.signUpType = signUpType;
          data.s_no = index + 1;
          return data;
        });
        setUserList(list);
        //   if (showSuccessMsg) {
        //     alertMessage(res?.response?.message, ALERT_TYPE.SUCCESS);
        //   }
      } else {
        alertMessage(res?.response?.message, ALERT_TYPE.ERROR);
      }
    });
  };

  return (
    <div className={styles.UserManagementContent}>
      <div className={styles.UserManagementContent_head}>
        <h1 className={styles.UserManagementContent_title}>User Management</h1>
      </div>
      {/* <div className={styles.UserManagementContent_search_wrapper}>
        <Input
          className={styles.UserManagementContent_search_box}
          value={searchText}
          placeholder="Search"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div> */}
      <Table
        columns={[
          { key: "s_no", header: "S.No" },
          { key: "username", header: "Name" },
          { key: "email", header: "Email" },
          { key: "signUpType", header: "SignUp Type" },
          //   { key: "formatted_datetime", header: "SignUp Time" },
          // {
          //   key: "actions",
          //   header: "Actions",
          //   render: (row) => (
          //     <div className={styles.AiProfile_actions}>
          //      View
          //     </div>
          //   ),
          // },
        ]}
        data={userList ? userList : []}
      />
    </div>
  );
};

export default UserManagementContent;
