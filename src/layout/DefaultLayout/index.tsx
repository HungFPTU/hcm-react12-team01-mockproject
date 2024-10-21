import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface DefaultLayoutProps {
  children?: ReactNode;  // Make children optional
}

export const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-[#e673d4] to-[#ff8a55]">
      
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};
export default DefaultLayout