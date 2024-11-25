import {
  AppstoreOutlined,
  NodeExpandOutlined,
  LikeOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  DollarOutlined,
  SettingOutlined,
  FileDoneOutlined,
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
            key: "/instructor/manage-course",
            icon: <FileDoneOutlined />,
            label: "Manage Course",
          },
          {
            key: "/instructor/course-log",
            icon: <NodeExpandOutlined />,
            label: "Course Log",
          },
          {
            key: "/instructor/sales-history",
            icon: <ShoppingCartOutlined />,
            label: "Sales History",
          },
          {
            key: "/instructor/payouts",
            icon: <DollarOutlined />,
            label: "Payout",
          },
          {
            key: "/instructor/my-learning",
            icon: <BookOutlined />,
            label: "My Learning",
          },
          {
            key: "/instructor/subscriptions",
            icon: <LikeOutlined />,
            label: "Subcription",
          },
          {
            key: "/instructor/review",
            icon: <StarOutlined />,
            label: "Review",
          },
          {
            key: "/instructor/purchase-log",
            icon: <SettingOutlined />,
            label: "Purchase Log",
          },
          {
            key: "/instructor/setting",
            icon: <SettingOutlined />,
            label: "Setting",
          },
        ]}
      />
    </>
  );
}

export default SidebarComponents;
