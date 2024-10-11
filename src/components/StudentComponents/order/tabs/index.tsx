import { Tabs } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

interface OrderTabsProps {
  onTabChange?: (key: string) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ onTabChange }) => {
  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    if (onTabChange) {
      onTabChange(key);
    }

    if (key === "1") {
      navigate("/view-order");
    } else if (key === "2") {
      navigate("/view-order/completed-orders");
    }
  };

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      <TabPane tab="Waiting Page" key="1" />
      <TabPane tab="Completed" key="2" />
    </Tabs>
  );
};
export default OrderTabs;
