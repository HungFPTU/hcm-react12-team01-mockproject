import {
    AppstoreOutlined,
    ShoppingCartOutlined,
    LikeOutlined,
    SettingOutlined,
    BookOutlined,
    DollarOutlined,
    StarOutlined,
    FileTextOutlined
  } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => navigate(key)}
            items={[
                {
                  key: "1",
                  icon: <AppstoreOutlined />,
                  label: "Dashboard",
                },
                {
                  key: "/manage-course",
                  icon: <BookOutlined />,
                  label: "Manage Course",
                },
                {
                  key: "3",
                  icon: <BookOutlined />,
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
                  key: "6",
                  icon: <FileTextOutlined />,
                  label: "Order",
                },
                {
                  key: "7",
                  icon: <LikeOutlined />,
                  label: "Subcription",
                },
                {
                  key: "/review",
                  icon: <StarOutlined />,
                  label: "Review",
                },
                {
                  key: "9",
                  icon: <SettingOutlined />,
                  label: "Setting",
                },
              ]}
        />
    );
};

export default Sidebar;
