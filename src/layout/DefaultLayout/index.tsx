import React from "react";
import { Outlet } from "react-router-dom";
const Footer = React.lazy(() => import("../../components/Footer"));
const Header = React.lazy(() => import("../../components/Header"));


export const DefaultLayout = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-[#e673d4] to-[#ff8a55]">
      <Header />
      <div className="content flex justify-center"><Outlet /></div>
      <Footer />
    </div>
  );
};
export default DefaultLayout