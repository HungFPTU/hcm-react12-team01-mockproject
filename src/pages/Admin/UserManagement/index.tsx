/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Table,
  Avatar,
  Switch,
  Button,
  Input,
  Dropdown,
  Tabs,
  Modal,
  Form,
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
import AddUserModal from "./AddUserModal";

const { Search } = Input;
const { confirm } = Modal;

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  is_verified: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [form] = Form.useForm();

  const fetchUsers = (status: boolean, isVerified: boolean) => {
    UserService.getUsers(status, isVerified)
      .then((response) => {
        if (response.data.success) {
          const fetchedUsers = response.data.data.pageData;
          setUsers(fetchedUsers);
          setFilteredUsers(fetchedUsers);
        } else {
          message.error("Failed to load user data.");
        }
      })
      .catch(() => {
        message.error("Error fetching user data.");
      });
  };

  useEffect(() => {
    if (activeTab === "all") {
      fetchUsers(true, true);
    } else if (activeTab === "blocked") {
      fetchUsers(false, true);
    } else if (activeTab === "unverified") {
      fetchUsers(true, false);
    }
  }, [fetchUsers]);

  const toggleStatus = (record: User) => {
    const newStatus = !record.status;
    UserService.changeStatus(record._id, newStatus)
      .then((response) => {
        if (response.data.success) {
          fetchUsers(true, true); // Reload the user data after status change
          message.success("Cập nhật trạng thái thành công!");
        } else {
          message.error("Cập nhật trạng thái thất bại.");
        }
      })
      .catch(() => {
        message.error("Lỗi khi cập nhật trạng thái.");
      });
  };

  const changeUserRole = (userId: string, newRole: string) => {
    UserService.changeRole(userId, newRole)
      .then((response) => {
        if (response && response.data && response.data.success) {
          fetchUsers(true, true); // Reload after changing role
          message.success("Cập nhật vai trò thành công!");
        } else {
          message.error("Cập nhật vai trò thất bại.");
        }
      })
      .catch((error) => {
        console.error("Error changing role:", error);
        message.error("Lỗi khi cập nhật vai trò.");
      });
  };

  const handleSearch = (value: string) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddUser = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values: any) => {
    const {
      name,
      email,
      role,
      password,
      description,
      avatar_url,
      video_url,
      phone_number,
      bank_name,
      bank_account_no,
      bank_account_name,
    } = values;
  
    UserService.createUser(
      name,
      email,
      password,
      role,
      true, // Truyền status là boolean thay vì chuỗi
      description,
      avatar_url,
      video_url,
      phone_number,
      bank_name,
      bank_account_no,
      bank_account_name
    ).then(() => {
      fetchUsers(true, true); // Reload data from server
      setIsModalVisible(false);
      message.success("Tạo người dùng thành công!");
      form.resetFields();
    }).catch(() => {
      message.error("Tạo người dùng thất bại.");
    });
  };
  

  const confirmDeleteUser = (id: string) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa người dùng này không?",
      content: "Thao tác này không thể hoàn tác.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteUser(id);
      },
    });
  };

  const deleteUser = (id: string) => {
    UserService.deleteUser(id)
      .then((response) => {
        if (response.data.success) {
          fetchUsers(true, true); // Reload data after deleting user
          message.success("Xóa người dùng thành công!");
        } else {
          message.error("Xóa người dùng thất bại.");
        }
      })
      .catch(() => {
        message.error("Lỗi khi xóa người dùng.");
      });
  };

  const roleMenuItems = [
    { label: "Student", key: "student" },
    { label: "Instructor", key: "instructor" },
    { label: "Admin", key: "admin" },
  ];

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
    ...(activeTab === "unverified"
      ? [
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string) => <span>{role}</span>,
          },
          {
            title: "Status",
            key: "status",
            render: (record: User) => (
              <Button
                disabled
                onClick={() => toggleStatus(record)}
                style={{
                  backgroundColor: "green",
                  color: "#fff",
                  fontSize: 13,
                }}
              >
                Activate
              </Button>
            ),
          },
          {
            title: "Verified",
            dataIndex: "is_verified",
            key: "verified",
            render: () => (
              <Button
                disabled
                style={{
                  backgroundColor: "grey",
                  color: "#fff",
                  fontSize: 13,
                }}
              >
                Not Verified
              </Button>
            ),
          },
        ]
      : [
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string, record: User) => (
              <Dropdown
                menu={{
                  items: roleMenuItems,
                  onClick: ({ key }) => {
                    console.log("Changing role to:", key);
                    changeUserRole(record._id, key);
                  },
                }}
                trigger={["click"]}
              >
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
                  onClick={() => confirmDeleteUser(record._id)}
                />
              </>
            ),
          },
        ]),

  ];

  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        defaultActiveKey="all"
        onChange={(key) => setActiveTab(key)}
        style={{ marginBottom: 20 }}
        items={[
          { key: "all", label: "All accounts", children: <></> },
          { key: "blocked", label: "Blocked accounts", children: <></> },
          { key: "unverified", label: "Unverified accounts", children: <></> },
        ]}
      />
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
          pageSizeOptions: ["10", "100"],
          position: ["bottomRight"],
        }}
        rowKey="_id"
      />

      <AddUserModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UserManagement;
