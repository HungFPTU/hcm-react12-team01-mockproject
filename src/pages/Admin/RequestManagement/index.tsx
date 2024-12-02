import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Button, Form } from "antd";
import AvatarRenderer from "./AvatarRenderer";
import SearchBar from "./SearchBar";
import { UserService } from "../../../services/UserService/user.service";
import ActionsRenderer from "./ActionsRenderer";
import { toast } from "react-toastify";
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

  // State cho modal reject và confirm modal approve
  const [isRejectModalVisible, setIsRejectModalVisible] =
    useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>(""); // Lý do từ chối
  const [currentRequestKey, setCurrentRequestKey] = useState<string>("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] =
    useState<boolean>(false); // Modal xác nhận duyệt

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
          toast.error("Failed to load request data.");
        }
      })
      .catch(() => {
        toast.error("Error fetching request data.");
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

  const handleApprove = () => {
    // Gọi API để duyệt yêu cầu
    UserService.reviewProfileInstructor({
      userId: currentRequestKey, // Truyền userId
      status: "approve", // Truyền status là "approve"
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(`Request with key ${currentRequestKey} approved.`);
          setRequests((prevRequests) =>
            prevRequests.filter((request) => request.key !== currentRequestKey)
          );
          setFilteredRequests((prevFilteredRequests) =>
            prevFilteredRequests.filter(
              (request) => request.key !== currentRequestKey
            )
          );
          setIsConfirmModalVisible(false); // Đóng modal xác nhận
        } else {
          toast.error("Failed to approve request.");
        }
      })
      .catch(() => {
        toast.error("Error approving request.");
      });
  };

  const showConfirmModal = (key: string) => {
    setCurrentRequestKey(key); // Lưu key yêu cầu đang duyệt
    setIsConfirmModalVisible(true); // Hiển thị modal xác nhận
  };

  const handleReject = () => {
    if (!rejectReason) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    // Gọi API với lý do từ chối
    UserService.reviewProfileInstructor({
      userId: currentRequestKey, // Truyền userId
      status: "reject", // Truyền status là "reject"
      comment: rejectReason, // Thêm lý do từ chối
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(`Request with key ${currentRequestKey} rejected.`);
          setRequests((prevRequests) =>
            prevRequests.filter((request) => request.key !== currentRequestKey)
          );
          setFilteredRequests((prevFilteredRequests) =>
            prevFilteredRequests.filter(
              (request) => request.key !== currentRequestKey
            )
          );
          setIsRejectModalVisible(false); // Đóng modal reject
        } else {
          toast.error("Failed to reject request.");
        }
      })
      .catch(() => {
        toast.error("Error rejecting request.");
      });
  };

  const showRejectModal = (key: string) => {
    setCurrentRequestKey(key); // Set the current request key
    setIsRejectModalVisible(true); // Show the modal
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
          onApprove={() => showConfirmModal(record.key)} // Hiển thị modal xác nhận
          onReject={() => showRejectModal(record.key)} // Hiển thị modal từ chối
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
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejection"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Confirm Approve */}
      <Modal
        title="Confirm Approval"
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsConfirmModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleApprove}>
            Confirm
          </Button>,
        ]}
      >
        <p>Are you sure you want to approve this request?</p>
      </Modal>
    </div>
  );
};

export default RequestManagement;
