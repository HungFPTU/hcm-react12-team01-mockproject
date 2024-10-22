import { Layout } from "antd";
import { ReactNode, useState } from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SidebarComponents from "../../components/AdminComponents/SidebarCoponent";
import Loading from "../../components/Loading";

const { Content, Sider } = Layout;

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading

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
          {/* Truyền setLoading function vào SidebarComponents */}
          <SidebarComponents setLoading={setLoading} />
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? "80px" : "200px",
            transition: "all 0.2s",
          }}
        >
          {/* Hiển thị component Loading khi loading state là true */}
          {loading ? (
            <Loading /> // Sử dụng Loading component của bạn
          ) : (
            <Content
              style={{
                margin: "24px 16px 0",
                padding: "24px",
                backgroundColor: "#fff",
              }}
            >
              {children}
            </Content>
          )}
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default AdminLayout;
