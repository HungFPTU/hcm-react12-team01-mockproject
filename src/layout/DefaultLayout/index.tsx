import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface DefaultLayoutProps {
  children?: ReactNode;  // Make children optional
}

export const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  return (
    <div>
      <Header />
      <div className="content flex justify-center">{children}</div>
      <Footer />
    </div>
  );
};
export default DefaultLayout