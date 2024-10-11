import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Session } from "../../../model/Session";
import SearchComponent from "../../../components/StudentComponents/search";

const dataSource: Session[] = [
  {
    key: "1",
    Name: "Session 1",
    CourseName: "JavaScript Basics",
    CreatedAt: "2023-07-10",
  },
  {
    key: "2",
    Name: "Session 2",
    CourseName: "Advanced CSS",
    CreatedAt: "2023-08-15",
  },
  {
    key: "3",
    Name: "Session 3",
    CourseName: "React for Beginners",
    CreatedAt: "2023-09-05",
  },
  {
    key: "4",
    Name: "Session 4",
    CourseName: "Node.js Mastery",
    CreatedAt: "2023-09-20",
  },
  {
    key: "5",
    Name: "Session 5",
    CourseName: "Python Programming",
    CreatedAt: "2023-10-01",
  },
  {
    key: "6",
    Name: "Session 6",
    CourseName: "Machine Learning A-Z",
    CreatedAt: "2023-10-15",
  },
  {
    key: "7",
    Name: "Session 7",
    CourseName: "Docker Essentials",
    CreatedAt: "2023-11-05",
  },
  {
    key: "8",
    Name: "Session 8",
    CourseName: "Kubernetes Fundamentals",
    CreatedAt: "2023-11-20",
  },
  {
    key: "9",
    Name: "Session 9",
    CourseName: "AWS Certified Solutions Architect",
    CreatedAt: "2023-12-10",
  },
  {
    key: "10",
    Name: "Session 10",
    CourseName: "Introduction to SQL",
    CreatedAt: "2023-12-25",
  },
  {
    key: "11",
    Name: "Session 11",
    CourseName: "Cybersecurity Basics",
    CreatedAt: "2024-01-05",
  },
  {
    key: "12",
    Name: "Session 12",
    CourseName: "Agile Project Management",
    CreatedAt: "2024-01-20",
  },
  {
    key: "13",
    Name: "Session 13",
    CourseName: "Intro to Blockchain",
    CreatedAt: "2024-02-10",
  },
  {
    key: "14",
    Name: "Session 14",
    CourseName: "Fullstack Development",
    CreatedAt: "2024-03-01",
  },
  {
    key: "15",
    Name: "Session 15",
    CourseName: "Artificial Intelligence",
    CreatedAt: "2024-03-25",
  },
];

const columns: ColumnsType<Session> = [
  {
    title: "Session Name",
    dataIndex: "Name",
    key: "name",
  },
  {
    title: "Course Name",
    dataIndex: "CourseName",
    key: "courseName",
  },
  {
    title: "Created At",
    dataIndex: "CreatedAt",
    key: "createdAt",
  },
];

function TableSession() {
  const handleSearch = () => {
    console.log("test");
  };
  return (
    <div>
      <div style={{ paddingBottom: "12px" }}>
        <SearchComponent
          placeholder="Search by Session"
          onSearch={handleSearch}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default TableSession;
