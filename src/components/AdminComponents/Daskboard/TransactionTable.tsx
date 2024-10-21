import React from "react";
import { Table } from "antd";

const transactionData = [
  {
    key: "1",
    payoutNumber: "PAYOUT_MHTHU420240801",
    amount: "$797,580",
    date: "2024/8/5",
  },
  {
    key: "2",
    payoutNumber: "PAYOUT_MUVAZY20240801",
    amount: "$426,867",
    date: "2024/8/2",
  },
];

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

const TransactionTable: React.FC = () => {
  return (
    <Table
      dataSource={transactionData}
      columns={columns}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ["4", "8"],
        position: ["bottomRight"],
      }}
      style={{ marginTop: 20, marginBottom: 20 }}
    />
  );
};

export default TransactionTable;
