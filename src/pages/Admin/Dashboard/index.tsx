import React from "react";
import { Row, Col } from "antd";
import {
  DollarOutlined,
  TagOutlined,
  BookOutlined,
  UserOutlined,
  MessageOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import StatisticCard from "./StatisticCard"; // Đường dẫn đến file StatisticCard
import TransactionTable from "./TransactionTable"; // Đường dẫn đến file TransactionTable

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: 20, fontWeight: "600", marginBottom: "20px" }}>
        <AppstoreOutlined /> Admin Dashboard
      </h2>

      <Row gutter={16}>
        <Col span={6}>
          <StatisticCard
            icon={<DollarOutlined />}
            title="Total Balance"
            value="8,525,763"
            borderColor="#fadb14"
            iconColor="#fadb14"
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            icon={<TagOutlined />}
            title="Total Categories"
            value="24"
            borderColor="#722ed1"
            iconColor="#722ed1"
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            icon={<BookOutlined />}
            title="Total Courses"
            value="10"
            borderColor="#eb2f96"
            iconColor="#eb2f96"
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            icon={<UserOutlined />}
            title="Total Users"
            value="26"
            borderColor="#722ed1"
            iconColor="#722ed1"
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={6}>
          <StatisticCard
            icon={<MessageOutlined />}
            title="Total Blogs"
            value="2"
            borderColor="#722ed1"
            iconColor="#722ed1"
          />
        </Col>
      </Row>

      <div style={{ marginTop: "20px" }}>
        <h3
          style={{ fontSize: 20, fontWeight: "600", margin: "30px 0 20px 0" }}
        >
          Latest Transactions
        </h3>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Dashboard;
