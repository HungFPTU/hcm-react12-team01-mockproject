import {
  AppstoreOutlined,
  ShoppingCartOutlined,
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
            key: "/all-courses",
            icon: <AppstoreOutlined />,
            label: "All Courses",
          },
          {
            key: "/pending-courses",
            icon: <ShoppingCartOutlined />,
            label: "PendingCourses",
          },
          {
            key: "/courses-log",
            icon: <LikeOutlined />,
            label: "CoursesLog",
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
