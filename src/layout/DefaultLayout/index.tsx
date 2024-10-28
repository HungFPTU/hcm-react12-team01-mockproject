import React from "react";
import { Outlet } from "react-router-dom";
const Footer = React.lazy(() => import("../../components/Footer"));
const Header = React.lazy(() => import("../../components/Header"));


export const DefaultLayout = (): JSX.Element => {
  return (
    <div>
      <Header />
      <div className="content"><Outlet /></div>
      <Footer />
    </div>
  );
};
export default DefaultLayout