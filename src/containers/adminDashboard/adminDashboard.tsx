"use client";
import React, { useEffect, useState } from "react";
import styles from "./adminDashboard.module.scss";
import StatusCountCard from "@/components/statusCountCard/statusCountCard";
import {
  getAdminDashboardApi,
  getMessageExchangedListApi,
} from "@/app/api/admin/admin";
import { LuUsers } from "react-icons/lu";
import { IoChatboxOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { LuBot } from "react-icons/lu";
import LineChart from "@/components/lineChart/lineChart";
import moment from "moment";

const AdminDashboard = () => {
  const [countCardData, setCountCardData] = useState({
    users: "-",
    chatSessions: "-",
    chatMessages: "-",
    aiProfiles: "-",
  });

  const [messageChartDataList, setMessageChartDataList] = useState([]);

  useEffect(() => {
    updatePageContent();

    const payload = {
      days: 7,
    };
    updateMessageChartData(payload);
  }, []);

  const updatePageContent = () => {
    getAdminDashboardApi((res) => {
      if (res?.response?.status === 200) {
        const content = res?.content;
        setCountCardData({
          users: content?.user_count,
          chatSessions: content?.session_count,
          chatMessages: content?.chat_message_count,
          aiProfiles: content?.ai_profile_count,
        });
      }
    });
  };

  const updateMessageChartData = (payload: any) => {
    getMessageExchangedListApi(payload, (res) => {
      if (res?.response?.status === 200) {
        const dataList =
          res?.content &&
          res?.content.map((data: any) => {
            data.label = moment(data?.date).format("DD MMMM");
            data.value = data?.count;
            return data;
          });
        setMessageChartDataList(dataList);
      } else {
      }
    });
  };

  return (
    <div className={styles.AdminDashboard}>
      <h1 className={styles.AdminDashboard_title}>Admin Dashboard</h1>
      <div className={styles.AdminDashboard_count_card_wrapper}>
        <StatusCountCard
          className={styles.AdminDashboard_count_card}
          Icon={LuUsers}
          title="Total Users"
          count={countCardData?.users}
          description="Active users in the system"
        />
        <StatusCountCard
          className={styles.AdminDashboard_count_card}
          Icon={IoChatboxOutline}
          title="Chat Sessions"
          count={countCardData?.chatSessions}
          description="Total chat conversations"
        />
        <StatusCountCard
          className={styles.AdminDashboard_count_card}
          Icon={IoChatboxOutline}
          title="Total Messages"
          count={countCardData?.chatMessages}
          description="Messages exchanged"
        />
        <StatusCountCard
          className={styles.AdminDashboard_count_card}
          Icon={LuBot}
          title="AI Profiles"
          count={countCardData?.aiProfiles}
          description="Available AI assistants"
        />
      </div>
      <h1 className={`${styles.AdminDashboard_chart_title}`}>
        Messages Excanged per Day
      </h1>

      <div className={styles.AdminDashboard_chart_wrapper}>
        {/* <p>Messages Excanged per Day</p> */}
        <LineChart
          data={messageChartDataList}
          tooltipLabel="Messages: "
          // chartTitle="Messages Excanged per Day"
          className={styles.AdminDashboard_chart}
          // yAxisLabel="Chat Message Count"
          // xAxisLabel="Time"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
