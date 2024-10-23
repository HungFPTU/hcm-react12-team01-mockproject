
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho log mua hàng
export type PurchaseLog = {
  key: string;
  courseName: string;
  purchaseNumber: string;
  status: string;
  pricePaid: number;
  discount: string;
  studentName: string;
  instructorName: string;
  createdAt: string;
};

// Dữ liệu mẫu
const initialData: PurchaseLog[] = [
  {
    key: "1",
    courseName: "Yoga for Kids Relaxation, Emotional Well-being With Poses",
    purchaseNumber: "PURCHASE_ZOOIE20241009",
    status: "NEW",
    pricePaid: 180.0,
    discount: "None",
    studentName: "Group2",
    instructorName: "Luu Ka Ka",
    createdAt: "09/10/2024",
  },
  {
    key: "3",
    courseName: "Yoga for Kids Relaxation, Emotional Well-being With Poses",
    purchaseNumber: "PURCHASE_ZOOIE20241009",
    status: "NEW",
    pricePaid: 180.0,
    discount: "None",
    studentName: "Group2",
    instructorName: "Luu Ka Ka",
    createdAt: "09/10/2024",
  },
  {
    key: "4",
    courseName: "Yoga for Kids Relaxation, Emotional Well-being With Poses",
    purchaseNumber: "PURCHASE_ZOOIE20241009",
    status: "NEW",
    pricePaid: 180.0,
    discount: "None",
    studentName: "Group2",
    instructorName: "Luu Ka Ka",
    createdAt: "09/10/2024",
  },
  {
    key: "5",
    courseName: "Yoga for Kids Relaxation, Emotional Well-being With Poses",
    purchaseNumber: "PURCHASE_ZOOIE20241009",
    status: "NEW",
    pricePaid: 180.0,
    discount: "None",
    studentName: "Group2",
    instructorName: "Luu Ka Ka",
    createdAt: "09/10/2024",
  },
  {
    key: "6",
    courseName: "Yoga for Kids Relaxation, Emotional Well-being With Poses",
    purchaseNumber: "PURCHASE_ZOOIE20241009",
    status: "NEW",
    pricePaid: 180.0,
    discount: "None",
    studentName: "Group2",
    instructorName: "Luu Ka Ka",
    createdAt: "09/10/2024",
  },
  {
    key: "7",
    courseName: "Complete Guitar Lessons System - Beginner to Advanced",
    purchaseNumber: "PURCHASE_TNLZJ20241007",
    status: "NEW",
    pricePaid: 489.65,
    discount: "10%",
    studentName: "Ngô Thị Tuyết Trúc",
    instructorName: "Luu Ka Ka",
    createdAt: "07/10/2024",
  },
  // Thêm các mục dữ liệu khác theo cùng một cấu trúc
];

// Component để hiển thị bảng log mua hàng
function PurchaseLogTable() {
  const [data] = useState<PurchaseLog[]>(initialData);

  const columns: ColumnsType<PurchaseLog> = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (text) => {
        return text.length > 20 ? text.slice(0, 20) + "..." : text;
      },
    },

    {
      title: "Purchase Number",
      dataIndex: "purchaseNumber",
      key: "purchaseNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Price Paid",
      dataIndex: "pricePaid",
      key: "pricePaid",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="key" />;
}

export default PurchaseLogTable;
