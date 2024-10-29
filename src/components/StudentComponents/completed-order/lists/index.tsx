import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

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
  const columns: ColumnsType<CompletedOrder> = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (text: string) => (
          <div className="truncate max-w-xs" title={text}>
            {text}
          </div>
      ),
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
      width: 200, // Adjust width to fit longer names
    },
    {
      title: "Instructor Name",
      dataIndex: "instructorName",
      key: "instructorName",
      width: 200, // Adjust width to fit longer names
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
