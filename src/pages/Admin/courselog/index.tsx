import  { CSSProperties } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho log của khóa học
export type CourseLog = {
  key: string;
  courseName: string;
  oldStatus: string;
  newStatus: string;
  comment: string;
};

// Dữ liệu mẫu
const initialData: CourseLog[] = [
  {
    key: "1",
    courseName: "Introduction to Python Programming",
    oldStatus: "WAITING_APPROVE",
    newStatus: "APPROVE",
    comment: "fsdd",
  },
  {
    key: "2",
    courseName: "Introduction to Python Programming",
    oldStatus: "NEW",
    newStatus: "WAITING_APPROVE",
    comment: "",
  },
  {
    key: "3",
    courseName: "Nguyễn Ngọc Bảo",
    oldStatus: "WAITING_APPROVE",
    newStatus: "REJECT",
    comment: "NO Good",
  },
  {
    key: "4",
    courseName: "Nguyễn Ngọc Bảo",
    oldStatus: "NEW",
    newStatus: "WAITING_APPROVE",
    comment: "",
  },
  {
    key: "5",
    courseName: "Course 1",
    oldStatus: "APPROVE",
    newStatus: "ACTIVE",
    comment: "",
  },
  {
    key: "6",
    courseName: "Financial Analysis and Financial Modeling using MS Excel",
    oldStatus: "NEW",
    newStatus: "WAITING_APPROVE",
    comment: "ok",
  },
];

// Component để hiển thị bảng log khóa học
function CourseLogTable() {
  const [data] = useState<CourseLog[]>(initialData);

  // Cấu hình các cột cho bảng
  const columns: ColumnsType<CourseLog> = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Old Status",
      dataIndex: "oldStatus",
      key: "oldStatus",
      render: (status) => {
        const style: CSSProperties = {
          width: 150,
          display: "inline-block",
          textAlign: "center",
        };
        if (status === "ACTIVE") {
          return (
            <span style={style}>
              <Tag color="green">{status}</Tag>
            </span>
          );
        } else if (status === "WAITING_APPROVE") {
          return (
            <span style={style}>
              <Tag color="gold">{status}</Tag>
            </span>
          );
        } else {
          return (
            <span style={style}>
              <Tag color="red">{status}</Tag>
            </span>
          );
        }
      },
    },
    {
      title: "New Status",
      dataIndex: "newStatus",
      key: "newStatus",
      render: (status) => {
        const style: CSSProperties = {
          width: 150,
          display: "inline-block",
          textAlign: "center",
        };
        if (status === "ACTIVE") {
          return (
            <span style={style}>
              <Tag color="green">{status}</Tag>
            </span>
          );
        } else if (status === "WAITING_APPROVE") {
          return (
            <span style={style}>
              <Tag color="gold">{status}</Tag>
            </span>
          );
        } else {
          return (
            <span style={style}>
              <Tag color="red">{status}</Tag>
            </span>
          );
        }
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default CourseLogTable;
