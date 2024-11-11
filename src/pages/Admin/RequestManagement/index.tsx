import React, { useEffect, useState } from "react";
import { Table, message, Modal, Input, Button, Form } from "antd";
import AvatarRenderer from "./AvatarRenderer";
import SearchBar from "./SearchBar";
import { UserService } from "../../../services/UserService/UserService";
import ActionsRenderer from "./ActionsRenderer";

interface Request {
  key: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  description: string;
}

const RequestManagement: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);

  // State cho modal và lý do từ chối
  const [isRejectModalVisible, setIsRejectModalVisible] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>(''); // Lý do từ chối
  const [currentRequestKey, setCurrentRequestKey] = useState<string>('');

  useEffect(() => {
    UserService.getUsersWatingManager()
      .then((response) => {
        if (response.data.success) {
          const fetchedRequests = response.data.data.pageData.map(
            (user: any) => ({
              key: user._id,
              avatar: user.avatar_url || "",
              name: user.name,
              email: user.email,
              phone: user.phone || "",
              role: user.role,
              description: user.description || "",
            })
          );
          setRequests(fetchedRequests);
          setFilteredRequests(fetchedRequests);
        } else {
          message.error("Failed to load request data.");
        }
      })
      .catch(() => {
        message.error("Error fetching request data.");
      });
  }, []);

  const handleSearch = (value: string) => {
    const filtered = requests.filter(
      (request) =>
        request.name.toLowerCase().includes(value.toLowerCase()) ||
        request.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  const handleApprove = (key: string) => {
    UserService.reviewProfileInstructor(key, "approve")
      .then((response) => {
        if (response.data.success) {
          message.success(`Request with key ${key} approved.`);
          setRequests((prevRequests) =>
            prevRequests.filter((request) => request.key !== key)
          );
          setFilteredRequests((prevFilteredRequests) =>
            prevFilteredRequests.filter((request) => request.key !== key)
          );
        } else {
          message.error("Failed to approve request.");
        }
      })
      .catch(() => {
        message.error("Error approving request.");
      });
  };

  const handleReject = () => {
    if (!rejectReason) {
      message.error("Please provide a reason for rejection.");
      return;
    }
  
    // Gọi API với lý do từ chối
    UserService.reviewProfileInstructor(currentRequestKey, "reject", rejectReason)
      .then((response) => {
        if (response.data.success) {
          message.success(`Request with key ${currentRequestKey} rejected.`);
          setRequests((prevRequests) =>
            prevRequests.filter((request) => request.key !== currentRequestKey)
          );
          setFilteredRequests((prevFilteredRequests) =>
            prevFilteredRequests.filter((request) => request.key !== currentRequestKey)
          );
          setIsRejectModalVisible(false); // Đóng modal sau khi từ chối
        } else {
          message.error("Failed to reject request.");
        }
      })
      .catch(() => {
        message.error("Error rejecting request.");
      });
  };
  

  const showRejectModal = (key: string) => {
    setCurrentRequestKey(key);  // Set the current request key
    setIsRejectModalVisible(true);  // Show the modal
  };

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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <span>{description}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <ActionsRenderer
          requestKey={record.key}
          onApprove={() => handleApprove(record.key)}
          onReject={() => showRejectModal(record.key)} // Show the reject modal
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
        rowKey="key"
      />

      {/* Modal Reject */}
      <Modal
        title="Reject Request"
        visible={isRejectModalVisible}
        onCancel={() => setIsRejectModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsRejectModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleReject}>
            Confirm
          </Button>,
        ]}
      >
        <Form>
        <Form.Item label="Reason for rejection">
        <Input.TextArea
          value={rejectReason} // Gán giá trị từ rejectReason
          onChange={(e) => setRejectReason(e.target.value)}  // Cập nhật state rejectReason khi thay đổi
          placeholder="Please provide a reason for rejection"
          rows={4}
        />
        </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default RequestManagement;
