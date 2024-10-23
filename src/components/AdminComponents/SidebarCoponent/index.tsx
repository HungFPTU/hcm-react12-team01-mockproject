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


const SidebarComponents = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {

    navigate(key); // Navigate to the selected route

  };

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={handleMenuClick}
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
            label: "Request Management",
          },
          {
            key: "/admin/category-management",
            icon: <TagsOutlined />,
            label: "Category Management",
          },
          {
            key: "/admin/payout-management",
            icon: <FileTextOutlined />,
            label: "Payout Management",
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
};

export default SidebarComponents;
