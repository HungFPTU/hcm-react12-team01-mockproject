import React, { useState } from "react";
import { Table, Avatar, Button, Input } from "antd";

const { Search } = Input;

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
      render: (avatar: string) =>
        avatar ? <Avatar src={avatar} /> : <Avatar>{avatar || "N"}</Avatar>,
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
        <>
          <Button
            type="primary"
            onClick={() => handleApprove(record.key)}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleReject(record.key)}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: 20, color: "green" }}>Request Management</h2>
      <div style={{ marginBottom: "20px" }}>
        <Search
          placeholder="Search by user name or email"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredRequests}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default RequestManagement;
