import { Empty, Pagination } from "antd";
import { useState } from "react";
import SearchComponent from "../../../../components/StudentComponents/search";
import { subscribedInstructors } from "../../../../components/StudentComponents/subsription/subscribed/SubscribedInstructor";

const SubscriberPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <SearchComponent
          placeholder="Search by subscriber name"
          onSearch={() => {
            //Future functionality for searching subscriber names can be added here
          }}
        />
      </div>

      <Empty description="No subscribers found" />

      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={subscribedInstructors.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SubscriberPage;
