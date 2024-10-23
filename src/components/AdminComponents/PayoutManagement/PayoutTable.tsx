import React, { useState } from "react";
import { Table, Button, Modal } from "antd";

interface PayoutTableProps {
  filteredPayouts: any[];
}

const PayoutTable: React.FC<PayoutTableProps> = ({ filteredPayouts }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<any>(null);

  // Hàm mở modal và set dữ liệu payout được chọn
  const handleViewDetails = (record: any) => {
    setSelectedPayout(record); // Lưu trữ dữ liệu payout được chọn
    setIsModalVisible(true); // Hiển thị modal
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Payout No",
      dataIndex: "payoutNo",
      key: "payoutNo",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructorName",
      key: "instructorName",
    },
    {
      title: "Transaction",
      dataIndex: "transaction",
      key: "transaction",
      render: (_: string, record: any) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>
          View
        </Button>
      ),
    },
    {
      title: "Balance Origin",
      dataIndex: "balanceOrigin",
      key: "balanceOrigin",
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balancePaid",
      key: "balancePaid",
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balanceReceived",
      key: "balanceReceived",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any) => (
        <>
          <Button type="primary" style={{ marginRight: 8 }}>
            Approve
          </Button>
          <Button danger style={{ width: "85px" }}>
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredPayouts}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8"],
          position: ["bottomRight"],
        }}
      />

      {/* Modal hiển thị chi tiết payout */}
      <Modal
        title="Payout Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedPayout && (
          <div>
            <p>
              <strong>Payout No:</strong> {selectedPayout.payoutNo}
            </p>
            <p>
              <strong>Instructor Name:</strong> {selectedPayout.instructorName}
            </p>
            <p>
              <strong>Balance Origin:</strong> {selectedPayout.balanceOrigin}
            </p>
            <p>
              <strong>Balance Paid:</strong> {selectedPayout.balancePaid}
            </p>
            <p>
              <strong>Balance Received:</strong>{" "}
              {selectedPayout.balanceReceived}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PayoutTable;
