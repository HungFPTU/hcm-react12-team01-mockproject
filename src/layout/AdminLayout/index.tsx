import { ReactNode } from "react";
import Header from "../../components/Header";
import AdminSideBar from "../../components/AdminComponents/AdminSidebar";
import Footer from "../../components/Footer";

interface AdminLayoutProps {
  children?: ReactNode;  // Make children optional
}

export const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  return (
    <div>
      <Header />
      <AdminSideBar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};
export default AdminLayout