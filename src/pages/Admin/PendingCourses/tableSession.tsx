import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho phiên học
export type Psession = {
  key: number;
  name: string;
  courseName: string;
  createdAt: string;
};

// Dữ liệu mẫu ban đầu
const initialSessions: Psession[] = [
  {
    key: 1,
    name: "Session 1",
    courseName: "Introduction to Python Programming",
    createdAt: "2024-01-15",
  },
  {
    key: 2,
    name: "Session 2",
    courseName: "Advanced JavaScript",
    createdAt: "2024-02-20",
  },
  {
    key: 3,
    name: "Session 3",
    courseName: "Data Structures in C++",
    createdAt: "2024-03-25",
  },
];

// Component bảng để hiển thị các phiên học
function TableSessionPending() {
  const [sessions] = useState<Psession[]>(initialSessions);

  // Cấu hình các cột cho bảng
  const columns: ColumnsType<Psession> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  // Trả về bảng với dữ liệu và cấu hình cột
  return (
    <div>
      <Table dataSource={sessions} columns={columns} />
    </div>
  );
}

export default TableSessionPending;
