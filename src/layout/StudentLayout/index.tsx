import { ReactNode } from "react";
import Header from "../../components/Header";
import StudentSidebar from "../../components/StudentComponents/StudentSidebar";
import Footer from "../../components/Footer";

interface StudentLayoutProps {
  children?: ReactNode;  // Make children optional
}

export const StudentLayout = ({ children }: StudentLayoutProps): JSX.Element => {
  return (
    <div>
      <Header />
      <StudentSidebar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};
export default StudentLayout