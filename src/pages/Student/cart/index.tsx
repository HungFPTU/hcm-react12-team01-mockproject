import {useState} from "react";
import CompletedOrderPage from "./completed";
import MyCartPage from "./myCart";
import CartTabs from "../../../components/StudentComponents/cart/tabs";
import RejectedPage from "./rejected";

const CartPage = () => {
    const [activeTab, setActiveTab] = useState<string>("1");

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    return (
        <div className="p-8 mt-5">
            <CartTabs activeTab={activeTab} onTabChange={handleTabChange}/>
            {activeTab === "1" && <MyCartPage/>}
            {activeTab === "2" && <CompletedOrderPage/>}
            {activeTab === "3" && <RejectedPage/>}
        </div>
    );
};

export default CartPage;
