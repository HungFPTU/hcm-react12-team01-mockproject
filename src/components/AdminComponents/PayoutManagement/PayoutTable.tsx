import React from "react";
import { Table, Button } from "antd";

interface PayoutTableProps {
  filteredPayouts: any[];
}

const PayoutTable: React.FC<PayoutTableProps> = ({ filteredPayouts }) => {
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
          <Button danger style={{ width: "85px" }}>
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
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
  );
};

export default PayoutTable;
