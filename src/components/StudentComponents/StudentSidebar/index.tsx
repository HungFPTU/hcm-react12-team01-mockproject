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

      <Menu
         theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/student",
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

  );
};
export default StudentSidebar;
