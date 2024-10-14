import React, { useState } from "react";
import { Table, Avatar, Switch, Button, Input, Dropdown, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Search } = Input;

// Sample data for the users
const initialUsers = [
  {
    key: "1",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Lê Minh Trung",
    email: "ythao4565@gmail.com",
    role: "Student",
    status: true,
  },
  {
    key: "2",
    avatar: "",
    name: "Nguyen Dan Huy",
    email: "danhuy253@gmail.com",
    role: "Student",
    status: true,
  },
  {
    key: "3",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Group2",
    email: "team2fsoft@gmail.com",
    role: "Instructor",
    status: true,
  },
];

// Dropdown menu for role change
const roleMenu = (record: any, setUsers: any) => (
  <Menu
    onClick={({ key }) => {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.key === record.key ? { ...user, role: key } : user
        )
      );
    }}
  >
    <Menu.Item key="Student">Student</Menu.Item>
    <Menu.Item key="Instructor">Instructor</Menu.Item>
  </Menu>
);

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Handle status toggle
  const toggleStatus = (record: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === record.key ? { ...user, status: !user.status } : user
      )
    );
  };

  // Handle search functionality
  const handleSearch = (value: string) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Columns for the table
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) =>
        avatar ? <Avatar src={avatar} /> : <Avatar icon={<EditOutlined />} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, record: any) => (
        <Dropdown overlay={roleMenu(record, setUsers)}>
          <Button>
            {role} <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: any) => (
        <Switch checked={status} onChange={() => toggleStatus(record)} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, __: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="primary"
            style={{ marginRight: 8 }}
          />
          <Button icon={<DeleteOutlined />} type="primary" danger />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: 20, color: "green" }}>User Management</h2>
      <div style={{ marginBottom: "20px" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ float: "right" }}
        >
          Add User
        </Button>
        <Search
          placeholder="Search by name or email"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UserManagement;
