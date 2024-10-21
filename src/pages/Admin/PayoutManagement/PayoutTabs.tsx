import React from "react";
import { Tabs } from "antd";
import PayoutTable from "./PayoutTable";
import SearchInput from "./SearchInput";

const { TabPane } = Tabs;

interface PayoutTabsProps {
  filteredPayouts: any[];
  handleSearch: (value: string) => void;
}

const PayoutTabs: React.FC<PayoutTabsProps> = ({
  filteredPayouts,
  handleSearch,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Request_Paid" key="1">
        <SearchInput onSearch={handleSearch} />
        <PayoutTable filteredPayouts={filteredPayouts} />
      </TabPane>

      <TabPane tab="Completed" key="2">
        <p>No data for completed payouts yet.</p>
      </TabPane>

      <TabPane tab="Rejected" key="3">
        <p>No data for rejected payouts yet.</p>
      </TabPane>
    </Tabs>
  );
};

export default PayoutTabs;
