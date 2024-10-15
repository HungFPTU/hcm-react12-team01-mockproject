import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Layout, Menu } from "antd";
import { useState } from "react";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  LikeOutlined,
  SettingOutlined,
  BookOutlined,
  DollarOutlined,
  StarOutlined
} from "@ant-design/icons";

const { Content, Sider } = Layout;

interface InstructorLayoutProps {
  children?: ReactNode;
}

export const InstructorLayout = ({ children }: InstructorLayoutProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

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
            items={[
              {
                key: "1",
                icon: <AppstoreOutlined />,
                label: "Dashboard",
              },
              {
                key: "2",
                icon: <BookOutlined />,
                label: "Manage Course",
              },
              {
                key: "3",
                icon: <DollarOutlined />,
                label: "Payout",
              },
              {
                key: "4",
                icon: <ShoppingCartOutlined />,
                label: "Order",
              },
              {
                key: "5",
                icon: <LikeOutlined />,
                label: "Subcription",
              },
              {
                key: "6",
                icon: <StarOutlined />,
                label: "Review",
              },
              {
                key: "7",
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
