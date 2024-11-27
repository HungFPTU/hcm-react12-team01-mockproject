import { Tabs } from "antd";

const { TabPane } = Tabs;

interface SettingTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

const SettingTabs = ({ activeTab, onTabChange }: SettingTabsProps) => {
  return (
    <Tabs activeKey={activeTab} onChange={onTabChange}>
      <TabPane tab="Account" key="1" />
      <TabPane tab="Change Password" key="2" />
    </Tabs>
  );
};

export default SettingTabs;
