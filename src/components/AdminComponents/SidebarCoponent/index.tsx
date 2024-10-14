import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  LikeOutlined,
  SettingOutlined,
  UserOutlined,
  TagsOutlined,
  FileTextOutlined,
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
            key: "/daskboard-admin",
            icon: <AppstoreOutlined />,
            label: "Daskboard",
          },
          {
            key: "/display-account",
            icon: <UserOutlined />,
            label: "User Management",
          },
          {
            key: "/request-management",
            icon: <UserOutlined />,
            label: "Request Management",
          },
          {
            key: "/category-management",
            icon: <TagsOutlined />,
            label: "Category Management",
          },
          {
            key: "/payout-management",
            icon: <FileTextOutlined />,
            label: "Payout Management",
          },
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
