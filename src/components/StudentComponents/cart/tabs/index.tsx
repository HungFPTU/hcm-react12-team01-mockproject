import {Tabs} from "antd";

const {TabPane} = Tabs;

interface CartTabsProps {
    activeTab: string;
    onTabChange: (key: string) => void;
}

const CartTabs = ({activeTab, onTabChange}: CartTabsProps) => {
    return (
        <Tabs activeKey={activeTab} onChange={onTabChange}>
            <TabPane tab="My Cart" key="1"/>
            <TabPane tab="Completed" key="2"/>
            <TabPane tab="Rejected" key="3"/>
        </Tabs>
    );
};

export default CartTabs;
