import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs activeKey={activeTab} onChange={onTabChange}>
      <TabPane tab="Waiting" key="1" />
      <TabPane tab="Completed" key="2" />
    </Tabs>
  );
};

export default OrderTabs;
