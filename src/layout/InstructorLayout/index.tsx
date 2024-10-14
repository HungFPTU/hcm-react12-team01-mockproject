import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Layout, Menu } from "antd";
import { useState } from "react";
import {
  AppstoreOutlined,
  NodeExpandOutlined,
  LikeOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

interface InstructorLayoutProps {
  children?: ReactNode;
}

export const InstructorLayout = ({ children }: InstructorLayoutProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleMenuClick = (e: any) => {
    // Function to handle menu item clicks
    switch (e.key) {
      case "1":
        navigate("/dashboard-instructor"); // Example: Navigate to dashboard
        break;
      case "2":
        navigate("/course-log-instructor"); // Example: Navigate to course log
        break;
      // Add more cases for other menu items
      default:
        break;
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout style={{ marginTop: "66px" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ position: "fixed", left: 0, top: 66, bottom: 0 }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={handleMenuClick}
            items={[
              {
                key: "1",
                icon: <AppstoreOutlined />,
                label: "Dashboard",
              },
              {
                key: "2",
                icon: <NodeExpandOutlined />,
                label: "Course Log",
              },
              {
                key: "3",
                icon: <LikeOutlined />,
                label: "Subcription",
              },
              {
                key: "4",
                icon: <SettingOutlined />,
                label: "Setting",
              },
            ]}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? "80px" : "200px", transition: "all 0.2s" }}>
          <Content style={{ margin: "24px 16px 0", padding: "24px", backgroundColor: "#fff" }}>
            {children}
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default InstructorLayout;
