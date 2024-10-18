import React, { useState } from "react";
import OrderTabs from "../../../components/StudentComponents/order/tabs";
import CompletedOrderPage from "./completed";
import WaitingPage from "./waiting";

const OrderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="p-8 mt-5">
      <OrderTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === "1" && <WaitingPage />}
      {activeTab === "2" && <CompletedOrderPage />}
    </div>
  );
};

export default OrderPage;
