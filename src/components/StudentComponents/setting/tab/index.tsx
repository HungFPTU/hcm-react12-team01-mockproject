import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

interface SettingTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

const SettingTabs: React.FC<SettingTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <Tabs activeKey={activeTab} onChange={onTabChange}>
      <TabPane tab="Account" key="1" />
      <TabPane tab="Change Password" key="2" />
      <TabPane tab="Send Request Instructors" key="3" />
    </Tabs>
  );
};

export default SettingTabs;
