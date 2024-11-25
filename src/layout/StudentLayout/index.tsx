const { Content, Sider } = Layout;
import { Layout } from "antd";
import React, { useState, lazy } from "react";
import { Outlet } from "react-router-dom";

const Footer = lazy(() => import("../../components/Footer"));
const Header = lazy(() => import("../../components/HeaderDashboard"));
const StudentSidebar = React.lazy(() => import("../../components/StudentComponents/StudentSidebar"));


export const StudentLayout = (): JSX.Element => {
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
          <StudentSidebar />
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
            <Outlet />

          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default StudentLayout;
