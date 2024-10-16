import { Layout } from "antd";
import React,{ ReactNode, useState } from "react";

const Footer = React.lazy(() => import("../../components/Footer"));
const Header = React.lazy(() => import("../../components/Header"));
import Sidebar from "../../components/InstructorComponents/Sidebar";

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
          <Sidebar />
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? "80px" : "200px",
            transition: "all 0.2s",
          }}
        >
          <Content
            style={{
              margin: "24px 16px 0",
              padding: "24px",
              backgroundColor: "#fff",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default InstructorLayout;