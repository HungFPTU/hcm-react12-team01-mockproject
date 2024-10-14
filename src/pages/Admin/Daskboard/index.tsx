import React from "react";
import { Card, Row, Col, Table } from "antd";
import {
  DollarOutlined,
  TagOutlined,
  BookOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";

// Data for the table
const transactionData = [
  {
    key: "1",
    payoutNumber: "PAYOUT_MHTHU420240801",
    amount: "$797,580",
    date: "8/1/2024",
  },
  {
    key: "2",
    payoutNumber: "PAYOUT_MUVAZY20240801",
    amount: "$426,867",
    date: "8/2/2024",
  },
];

// Table columns
const columns = [
  {
    title: "Payout Number",
    dataIndex: "payoutNumber",
    key: "payoutNumber",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: 20, color: "green" }}>Admin Dashboard</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="Total Balance"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <DollarOutlined style={{ fontSize: "40px", color: "#fadb14" }} />
            <h3>8,525,763</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Total Categories"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <TagOutlined style={{ fontSize: "40px", color: "#722ed1" }} />
            <h3>24</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Total Courses"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <BookOutlined style={{ fontSize: "40px", color: "#eb2f96" }} />
            <h3>10</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Total Users"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <UserOutlined style={{ fontSize: "40px", color: "#722ed1" }} />
            <h3>26</h3>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={6}>
          <Card
            title="Total Blogs"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <MessageOutlined style={{ fontSize: "40px", color: "#722ed1" }} />
            <h3>2</h3>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: "20px" }}>
        <h3>Latest Transactions</h3>
        <Table
          dataSource={transactionData}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
