import { Table } from "antd";

export interface CompletedOrder {
  id: number;
  courseName: string;
  purchaseNumber: string;
  createdAt: string;
  studentName: string;
  instructorName: string;
  pricePaid: string;
  discount: string;
}

interface CompletedListProps {
  completedOrders: CompletedOrder[];
}

const CompletedList = ({ completedOrders }: CompletedListProps) => {
  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Purchase Number",
      dataIndex: "purchaseNumber",
      key: "purchaseNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructorName",
      key: "instructorName",
    },
    {
      title: "Price Paid",
      dataIndex: "pricePaid",
      key: "pricePaid",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={completedOrders}
      rowKey="id"
      pagination={false}
    />
  );
};

export default CompletedList;
