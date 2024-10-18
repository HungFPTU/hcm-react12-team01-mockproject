import {
  AppstoreOutlined,
  NodeExpandOutlined,
  LikeOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  DollarOutlined,
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
            key: "/instructor",
            icon: <AppstoreOutlined />,
            label: "Dashboard",
          },
          {
            key: "/manage-course",
            icon: <BookOutlined />,
            label: "Manage Course",
          },
          {
            key: "/course-log-instructor",
            icon: <NodeExpandOutlined />,
            label: "Course Log",
          },
          {
            key: "/sales-history",
            icon: <ShoppingCartOutlined />,
            label: "Sales History",
          },
          {
            key: "5",
            icon: <DollarOutlined />,
            label: "Payout",
          },
          {
            key: "/subcription-instructor",
            icon: <LikeOutlined />,
            label: "Subcription",
          },
          {
            key: "/review",
            icon: <StarOutlined />,
            label: "Review",
          },
          {
            key: "/purchase-courses",
            icon: <SettingOutlined />,
            label: "PurchaseLog",
          },
          {
            key: "9",
            icon: <SettingOutlined />,
            label: "Setting",
          },
        ]}
      />
    </>
  );
}

export default SidebarComponents;
