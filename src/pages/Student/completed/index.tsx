import { Input, Pagination } from "antd";
import React from "react";
import { completedOrders } from "../../../components/StudentComponents/completed-order/completedMockData";
import CompletedList from "../../../components/StudentComponents/completed-order/lists";
import OrderTabs from "../../../components/StudentComponents/order/tabs";

const { Search } = Input;

const CompletedOrderPage: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log(`Search value: ${value}`);
    // Add search functionality if needed
  };

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(`Page: ${page}, PageSize: ${pageSize}`);
    // Add pagination functionality if needed
  };

  return (
    <div className="p-8 mt-5">
      <OrderTabs onTabChange={(key) => console.log(`Tab changed to: ${key}`)} />
      <div className="mb-6">
        <Search
          placeholder="Search by purchase number"
          onSearch={handleSearch}
          enterButton
        />
      </div>
      <CompletedList completedOrders={completedOrders} />
      <div className="mt-6 flex justify-end">
        <Pagination
          total={completedOrders.length}
          showSizeChanger
          showQuickJumper
          defaultPageSize={10}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CompletedOrderPage;
