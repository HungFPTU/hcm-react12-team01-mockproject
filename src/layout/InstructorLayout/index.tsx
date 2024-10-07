import { ReactNode } from "react";
import Header from "../../components/Header";
import InstructorSidebar from "../../components/InstructorComponents/InstructorSidebar";
import Footer from "../../components/Footer";

interface InstructorLayoutProps {
  children?: ReactNode;  // Make children optional
}

export const InstructorLayout = ({ children }: InstructorLayoutProps): JSX.Element => {
  return (
    <div>
      <Header />
      <InstructorSidebar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};
export default InstructorLayout