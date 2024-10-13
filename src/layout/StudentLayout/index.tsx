import { ReactNode } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import StudentSidebar from "../../components/StudentComponents/StudentSidebar";

interface StudentLayoutProps {
  children?: ReactNode; // Make children optional
}

export const StudentLayout = ({
  children,
}: StudentLayoutProps): JSX.Element => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main content with Header and Footer */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-5 bg-gray-100">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default StudentLayout;
