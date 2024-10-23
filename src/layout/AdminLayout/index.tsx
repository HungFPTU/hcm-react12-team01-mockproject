import { Layout } from "antd";
import {  useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import SidebarComponents from "../../components/AdminComponents/sidebarComponent";
import { Outlet } from "react-router-dom";



const { Content, Sider } = Layout;

export const AdminLayout = (): JSX.Element => {
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
          {/* Truyền setLoading function vào SidebarComponents */}
          <SidebarComponents />
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
            <Outlet /> {/* Render the nested route content */}
          </Content>

        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default AdminLayout;