import React, { useState } from "react";
import {
  Table,
  Avatar,
  Switch,
  Button,
  Input,
  Dropdown,
  Menu,
  Tabs,
  Tag,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

// Sample data for each tab
const allUsers = [
  {
    key: "1", // key là chuỗi
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Lê Minh Trung",
    email: "ythao4565@gmail.com",
    role: "Student",
    status: true,
  },
  {
    key: "2", // key là chuỗi
    avatar: "",
    name: "Nguyen Dan Huy",
    email: "danhuy253@gmail.com",
    role: "Student",
    status: true,
  },
  {
    key: "3", // key là chuỗi
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
    <Menu.Item key="Admin">Admin</Menu.Item>
  </Menu>
);

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(allUsers); // Xoá activeTab vì không cần
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

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

  // Handle add user button click
  const handleAddUser = () => {
    setIsModalVisible(true); // Show modal
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submit
  const handleFormSubmit = (values: any) => {
    const { name, email, role } = values; // Xoá password và phone nếu không dùng
    if (!name.match(/^[a-zA-Z0-9 ]+$/)) {
      message.error("Tên không được chứa ký tự đặc biệt!");
      return;
    }
    const newUser = {
      key: (users.length + 1).toString(), // Đảm bảo key là chuỗi
      avatar: "",
      name,
      email,
      role,
      status: true,
    };
    setUsers([...users, newUser]);
    setFilteredUsers([...users, newUser]);
    setIsModalVisible(false);
    message.success("Tạo người dùng thành công!");
  };

  // Columns for the table
  const commonColumns = [
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

  // Add Verified column for unverified accounts
  const unverifiedColumns = [
    ...commonColumns,
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (verified: boolean) => (
        <Tag color={verified ? "green" : "red"}>
          {verified ? "Verified" : "Not Verified"}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Tabs defaultActiveKey="all" style={{ marginBottom: 20 }}>
        <TabPane tab="All accounts" key="all">
          <div style={{ marginBottom: "20px" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ float: "right", backgroundColor: "green" }}
              onClick={handleAddUser}
            >
              Add User
            </Button>
            <Search
              enterButton
              placeholder="Search by name or email"
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
          </div>
          <Table
            columns={commonColumns}
            dataSource={filteredUsers}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["4", "8"],
              position: ["bottomRight"],
            }}
          />
        </TabPane>
        <TabPane tab="Blocked accounts" key="blocked">
          <div style={{ marginBottom: "20px" }}>
            <Search
              enterButton
              placeholder="Search by name or email"
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
          </div>
          <Table
            columns={commonColumns}
            dataSource={filteredUsers}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["4", "8"],
              position: ["bottomRight"],
            }}
          />
        </TabPane>
        <TabPane tab="Unverified accounts" key="unverified">
          <div style={{ marginBottom: "20px" }}>
            <Search
              enterButton
              placeholder="Search by name or email"
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
          </div>
          <Table
            columns={unverifiedColumns}
            dataSource={filteredUsers}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["4", "8"],
              position: ["bottomRight"],
            }}
          />
        </TabPane>
      </Tabs>

      {/* Modal for Adding User */}
      <Modal
        title="Create New Account"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên!" },
              {
                pattern: /^[a-zA-Z0-9 ]+$/,
                message: "Tên không được chứa ký tự đặc biệt!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Instructor">Instructor</Option>
              <Option value="Student">Student</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                pattern: /^0\d{9}$/,
                message: "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
