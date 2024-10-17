import React, { useState } from "react";
import { Tabs, Table, Button, Input } from "antd";

const { Search } = Input;
const { TabPane } = Tabs;

// Sample payout data for each tab
const initialPayouts = [
  {
    key: "1",
    payoutNo: "PAYOUT_-DCVB7202410004",
    instructorName: "Lưu Ka Ka",
    transaction: "View",
    balanceOrigin: "180,000",
    balancePaid: "54,000",
    balanceReceived: "126,000",
  },
  {
    key: "2",
    payoutNo: "PAYOUT_P1I0KQ20241002",
    instructorName: "Lưu Ka Ka",
    transaction: "View",
    balanceOrigin: "180,000",
    balancePaid: "54,000",
    balanceReceived: "126,000",
  },
  {
    key: "3",
    payoutNo: "PAYOUT_V4KPV220240801",
    instructorName: "Phan Hồng Yến Thảo",
    transaction: "View",
    balanceOrigin: "1,250,000",
    balancePaid: "375,000",
    balanceReceived: "875,000",
  },
];

const PayoutManagement: React.FC = () => {
  const [payouts] = useState(initialPayouts);
  const [filteredPayouts, setFilteredPayouts] = useState(payouts);

  // Handle search functionality
  const handleSearch = (value: string) => {
    const filtered = payouts.filter((payout) =>
      payout.payoutNo.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPayouts(filtered);
  };

  // Columns for the table
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
      render: (text: string) => <a href="#">{text}</a>,
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
          <Button danger>Reject</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: 20, color: "green" }}>Payout Management</h2>

      {/* Tabs for Request_Paid, Completed, Rejected */}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Request_Paid" key="1">
          <div style={{ marginBottom: "20px" }}>
            <Search
              placeholder="Search by payout number"
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
          </div>
          <Table
            columns={columns}
            dataSource={filteredPayouts}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>

        <TabPane tab="Completed" key="2">
          <p>No data for completed payouts yet.</p>
        </TabPane>

        <TabPane tab="Rejected" key="3">
          <p>No data for rejected payouts yet.</p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PayoutManagement;
