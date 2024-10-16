import { Pagination } from "antd";
import React, { useState } from "react";
import SearchComponent from "../../../../components/StudentComponents/search";
import { subscribedInstructors } from "../../../../components/StudentComponents/subsription/subscribed/SubscribedInstructor";
import SubscribedList from "../../../../components/StudentComponents/subsription/subscribed/list/index";

const SubscribedPage: React.FC = () => {
  const [filteredInstructors, setFilteredInstructors] = useState(
    subscribedInstructors
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust as per your layout

  // Handle search query
  const handleSearch = (value: string) => {
    const filtered = subscribedInstructors.filter((instructor) =>
      instructor.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredInstructors(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate items to display based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInstructors = filteredInstructors.slice(startIndex, endIndex);

  return (
    <div className="p-8">
      <div className="mb-6">
        <SearchComponent
          placeholder="Search by instructor name"
          onSearch={handleSearch}
        />
      </div>
      <SubscribedList instructors={currentInstructors} />
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={filteredInstructors.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SubscribedPage;
