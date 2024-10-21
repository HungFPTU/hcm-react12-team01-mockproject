import { Tabs } from "antd";

const { TabPane } = Tabs;

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
  return (
    <Tabs activeKey={activeTab} onChange={onTabChange}>
      <TabPane tab="Waiting" key="1" />
      <TabPane tab="Completed" key="2" />
    </Tabs>
  );
};

export default OrderTabs;
