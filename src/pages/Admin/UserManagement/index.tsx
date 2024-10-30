import React, { useState, useEffect } from "react";
import {
  Table,
  Avatar,
  Switch,
  Button,
  Input,
  Dropdown,
  Menu,
  Tabs,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  DownOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { UserService } from "../../../services/UserService/UserService";

const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

// Define User type
interface User {
  _id: string;
  avatar_url: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

// Dropdown menu for role change
const roleMenu = (
  record: User,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => (
  <Menu
    onClick={({ key }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === record._id ? { ...user, role: key } : user
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
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch users from API on mount
  useEffect(() => {
    UserService.getUsers()
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.data.pageData);
          setFilteredUsers(response.data.data.pageData);
        } else {
          message.error("Failed to load user data.");
        }
      })
      .catch(() => {
        message.error("Error fetching user data.");
      });
  }, []);

  // Handle status toggle
  const toggleStatus = (record: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === record._id ? { ...user, status: !user.status } : user
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
    const { name, email, role } = values;
    if (!name.match(/^[a-zA-Z0-9 ]+$/)) {
      message.error("Tên không được chứa ký tự đặc biệt!");
      return;
    }
    const newUser: User = {
      _id: Date.now().toString(),
      avatar_url: "",
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

  // Function to delete user
  const deleteUser = (id: string) => {
    UserService.deleteUser(id) // Assuming UserService has a deleteUser method
      .then((response) => {
        if (response.data.success) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          setFilteredUsers((prevFilteredUsers) =>
            prevFilteredUsers.filter((user) => user._id !== id)
          );
          message.success("Xóa người dùng thành công!");
        } else {
          message.error("Xóa người dùng thất bại.");
        }
      })
      .catch(() => {
        message.error("Lỗi khi xóa người dùng.");
      });
  };

  // Columns for the table
  const commonColumns = [
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (avatar_url: string) =>
        avatar_url ? (
          <Avatar size="large" src={avatar_url} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        ),
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
      render: (role: string, record: User) => (
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
      render: (status: boolean, record: User) => (
        <Switch checked={status} onChange={() => toggleStatus(record)} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="primary"
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => deleteUser(record._id)} // Call delete function
          />
        </>
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
            rowKey="_id"
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
