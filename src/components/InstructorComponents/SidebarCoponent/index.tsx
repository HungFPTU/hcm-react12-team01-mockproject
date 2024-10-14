import {
  AppstoreOutlined,
  NodeExpandOutlined,
  LikeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
function SidebarComponents() {
  const navigate = useNavigate();
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/dashboard-instructor",
            icon: <AppstoreOutlined />,
            label: "Dashboard",
          },
          {
            key: "/course-log-instructor",
            icon: <NodeExpandOutlined />,
            label: "Course Log",
          },
          {
            key: "/subcription-instructor",
            icon: <LikeOutlined />,
            label: "Subcription",
          },
          {
            key: "/pruchase-courses",
            icon: <SettingOutlined />,
            label: "PurchaseLog",
          },
        ]}
      />
    </>
  );
}

export default SidebarComponents;
