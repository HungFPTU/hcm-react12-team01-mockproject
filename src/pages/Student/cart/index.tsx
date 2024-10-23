import { useState } from "react";
import CartTabs from "../../../components/StudentComponents/cart/tabs";
import MyCartPage from "./mycart";
import CompletedCartPage from "./completed";
import RejectedCartPage from "./rejected";

const CartPage = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="p-8 mt-5">
      <CartTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === "1" && <MyCartPage />}
      {activeTab === "2" && <CompletedCartPage />}
      {activeTab === "3" && <RejectedCartPage />}
    </div>
  );
};

export default CartPage;
