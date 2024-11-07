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
            key: "/admin",
            icon: <AppstoreOutlined />,
            label: "Daskboard",
          },
          {
            key: "/admin/user-management",
            icon: <UserOutlined />,
            label: "User Management",
          },
          {
            key: "/admin/request-management",
            icon: <UserOutlined />,
            label: "Request ",
          },
          {
            key: "/admin/category-management",
            icon: <TagsOutlined />,
            label: "Category ",
          },
          {
            key: "/admin/payout-management",
            icon: <FileTextOutlined />,
            label: "Payout ",
          },
          {
            key: "/admin/all-courses",
            icon: <AppstoreOutlined />,
            label: "All Courses",
          },
          {
            key: "/admin/pending-courses",
            icon: <ShoppingCartOutlined />,
            label: "PendingCourses",
          },
          {
            key: "/admin/courses-log",
            icon: <LikeOutlined />,
            label: "CoursesLog",
          },
          {
            key: "/admin/purchase-log",
            icon: <SettingOutlined />,
            label: "PurchaseLog",
          },
        ]}
      />
    </>
  );
}

export default SidebarComponents;
