import {
  DashboardOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentSidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "250px",
        marginTop: "64px",
        position: "relative",
        height: "100vh",
        overflow: "auto",
        zIndex: 1,
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/dashboard-student",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "/view-order",
            icon: <ShoppingCartOutlined />,
            label: "Order",
          },
          {
            key: "/list-subscription",
            icon: <ProfileOutlined />,
            label: "Subscription",
          },
          {
            key: "/setting",
            icon: <SettingOutlined />,
            label: "Setting",
          },
        ]}
      />
    </div>
  );
};
export default StudentSidebar;
