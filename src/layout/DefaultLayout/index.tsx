import { ReactNode } from "react";
import Header from "../../components/Header";
import GuestSideBar from "../../components/GuestComponents/GuestSidebar";
import Footer from "../../components/Footer";

interface DefaultLayoutProps {
  children?: ReactNode;  // Make children optional
}

export const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  return (
    <div>
      <Header />
      <GuestSideBar />
      <div className="content flex justify-center">{children}</div>
      <Footer />
    </div>
  );
};
export default DefaultLayout