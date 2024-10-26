import {
  DashboardOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const StudentSidebar = () => {
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
          key: "/student/order",
          icon: <ShoppingCartOutlined />,
          label: "Order",
        },
        {
          key: "/student/subscription",
          icon: <ProfileOutlined />,
          label: "Subscription",
        },
        {
          key: "/student/setting",
          icon: <SettingOutlined />,
          label: "Setting",
        },
      ]}
    />

  );
};
export default StudentSidebar;
