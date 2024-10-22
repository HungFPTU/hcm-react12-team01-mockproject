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
interface SidebarComponentsProps {
  setLoading: (loading: boolean) => void; // Accept the setLoading prop
}

const SidebarComponents = ({ setLoading }: SidebarComponentsProps) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    setLoading(true); // Start loading
    navigate(key); // Navigate to the selected route
    setTimeout(() => setLoading(false), 5000); // Simulate loading completion
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
            key: "/admin",
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
};

export default SidebarComponents;
