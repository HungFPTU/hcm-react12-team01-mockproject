import { Input, Pagination } from "antd";
import CompletedListCart from "../../../../components/StudentComponents/cart/completed-order/lists";
import { completedOrders } from "../../../../components/StudentComponents/completed-order/completedMockData";

const { Search } = Input;

const CompletedCartPage = () => {
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
      <div className="mb-6">
        <Search
          placeholder="Search by purchase number"
          onSearch={handleSearch}
          enterButton
        />
      </div>
      <CompletedListCart completedOrders={completedOrders} />
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

export default CompletedCartPage;
