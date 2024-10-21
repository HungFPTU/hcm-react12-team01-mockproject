import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

interface SubscriptionTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

const SubscriptionTabs = ({
  activeTab,
  onTabChange,
}: SubscriptionTabsProps) => {
  return (
    <Tabs activeKey={activeTab} onChange={onTabChange}>
      <TabPane tab="Subscribed" key="1" />
    </Tabs>
  );
};

export default SubscriptionTabs;
