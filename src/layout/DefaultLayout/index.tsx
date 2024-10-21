import React from "react";
import { ReactNode } from "react";
const Footer = React.lazy(() => import("../../components/Footer"));
const Header = React.lazy(() => import("../../components/Header"));

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