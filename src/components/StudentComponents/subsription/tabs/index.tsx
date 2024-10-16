import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

interface SubscriptionTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

const SubscriptionTabs: React.FC<SubscriptionTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <Tabs activeKey={activeTab} onChange={onTabChange}>
      <TabPane tab="Subscribed" key="1" />
      <TabPane tab="Subscriber" key="2" />
    </Tabs>
  );
};

export default SubscriptionTabs;
