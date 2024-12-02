import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Plession } from "../../../model/PendingLession";

// Dữ liệu mẫu
const initialLessons: Plession[] = [
  {
    key: "1",
    name: "Lesson 1",
    courseName: "Introduction to Python",
    type: "Video",
    fullTime: 90,
    createdAt: "2024-01-20",
    media: "URL1",
  },
  {
    key: "2",
    name: "Lesson 2",
    courseName: "Advanced JavaScript",
    type: "Text",
    fullTime: 45,
    createdAt: "2024-02-11",
    media: "URL2",
  },
  {
    key: "3",
    name: "Lesson 3",
    courseName: "Data Structures",
    type: "Video",
    fullTime: 60,
    createdAt: "2024-03-05",
    media: "URL3",
  },
];

// Component để hiển thị bảng các bài học
function TableLessonPending() {
  const [lessions] = useState<Plession[]>(initialLessons);

  // Cấu hình các cột cho bảng
  const columns: ColumnsType<Plession> = [
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
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Full Time (mins)",
      dataIndex: "fullTime",
      key: "fullTime",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Media",
      dataIndex: "media",
      key: "media",
      render: (media) => <a href={media}>View Media</a>, // Để hiển thị link, giả sử media là URL
    },
  ];

  return (
    <div>
      <Table dataSource={lessions} columns={columns} />
    </div>
  );
}

export default TableLessonPending;
