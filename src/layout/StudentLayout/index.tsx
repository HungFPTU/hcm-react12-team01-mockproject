const { Content, Sider } = Layout;

import Footer from "../../components/Footer";
import HeaderStudent from "../../components/StudentComponents/headerStudent";
import StudentSidebar from "../../components/StudentComponents/StudentSidebar";
import { Layout } from "antd";
import { ReactNode, useState } from "react";
interface StudentLayoutProps {
  children?: ReactNode; // Make children optional
}

export const StudentLayout = ({
  children,
}: StudentLayoutProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderStudent />
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
            {children}
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default StudentLayout;
