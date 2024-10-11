import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import SearchComponent from "../../../components/StudentComponents/search";

export type Lession = {
  key: string;
  Name: string;
  CourseName: string;
  Type: string;
  Fulltime: string;
  CreatedAt: string;
  Media: string;
};

const dataSource: Lession[] = [
  {
    key: "1",
    Name: "Intro to JavaScript",
    CourseName: "JavaScript Basics",
    Type: "Video",
    Fulltime: "1h 30m",
    CreatedAt: "2023-01-15",
    Media: "Video",
  },
  {
    key: "2",
    Name: "CSS Grid Layout",
    CourseName: "Advanced CSS",
    Type: "Article",
    Fulltime: "45m",
    CreatedAt: "2023-02-22",
    Media: "PDF",
  },
  {
    key: "3",
    Name: "React State Management",
    CourseName: "React for Beginners",
    Type: "Video",
    Fulltime: "2h 10m",
    CreatedAt: "2023-03-12",
    Media: "Video",
  },
  // More data here...
];

const columns: ColumnsType<Lession> = [
  {
    title: "Lession Name",
    dataIndex: "Name",
    key: "name",
  },
  {
    title: "Course Name",
    dataIndex: "CourseName",
    key: "courseName",
  },
  {
    title: "Type",
    dataIndex: "Type",
    key: "type",
  },
  {
    title: "Full Time",
    dataIndex: "Fulltime",
    key: "fulltime",
  },
  {
    title: "Created At",
    dataIndex: "CreatedAt",
    key: "createdAt",
  },
  {
    title: "Media",
    dataIndex: "Media",
    key: "media",
    render: (_, record) =>
      record.Media === "Video" ? (
        <video width="200" controls>
          <source
            src={`https://example.com/${record.Name}.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <span>{record.Media}</span>
      ),
  },
];

function TableLession() {
  const handleSearch = () => {
    console.log("test");
  };
  return (
    <div>
      <div style={{ paddingBottom: "12px" }}>
        <SearchComponent
          placeholder="Search by Lession"
          onSearch={handleSearch}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default TableLession;
