// RequestManagement.tsx
import React, { useState } from "react";
import { Table } from "antd";
import AvatarRenderer from "./AvatarRenderer";
import ActionsRenderer from "./ActionsRenderer";
import SearchBar from "./SearchBar";

// Sample data for the request management
const initialRequests = [
  {
    key: "1",
    avatar: "https://via.placeholder.com/40",
    name: "aaa",
    email: "baohg1204@gmail.com",
    phone: "1",
    description: "<p>sdfsdfsdafsdafasdfsdf</p>",
  },
  {
    key: "2",
    avatar: "https://via.placeholder.com/40",
    name: "aaa",
    email: "aa@gmail.com",
    phone: "123",
    description: "<p>Example Description</p>",
  },
  {
    key: "3",
    avatar: "",
    name: "Nguyễn Ngọc Bảo K16_HCM",
    email: "baonnse161010@fpt.edu.vn",
    phone: "0764752268",
    description: "agagaahah",
  },
  {
    key: "4",
    avatar: "",
    name: "Luu Ka Ka (K17 HCM)",
    email: "kalkse171652@fpt.edu.vn",
    phone: "0938659975",
    description: "I want to reply to member",
  },
];

// Function to handle description parsing
const parseHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(htmlString, "text/html");
  return parsed.body.textContent || "";
};

const RequestManagement: React.FC = () => {
  const [requests] = useState(initialRequests);
  const [filteredRequests, setFilteredRequests] = useState(requests);

  // Handle search functionality
  const handleSearch = (value: string) => {
    const filtered = requests.filter(
      (request) =>
        request.name.toLowerCase().includes(value.toLowerCase()) ||
        request.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  // Handle Approve/Reject actions
  const handleApprove = (key: string) => {
    // Logic for approving the request
    alert(`Request with key ${key} approved`);
  };

  const handleReject = (key: string) => {
    // Logic for rejecting the request
    alert(`Request with key ${key} rejected`);
  };

  // Columns for the table
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => <AvatarRenderer avatar={avatar} />,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <span>{parseHTML(description)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <ActionsRenderer
          key={record.key}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar onSearch={handleSearch} />
      <Table
        columns={columns}
        dataSource={filteredRequests}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8"],
          position: ["bottomRight"],
        }}
      />
    </div>
  );
};

export default RequestManagement;
