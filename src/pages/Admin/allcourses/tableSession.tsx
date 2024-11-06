import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import SearchComponent from "../../../components/StudentComponents/search";
import { Session } from "../../../model/Session";

const dataSource: Session[] = [
  {
    id: "1",
    key: "1",
    name: "Session 1",
    course_id: "1",
    course_name: "JavaScript Basics",
    lesson: "1",
    user_id: "1",
    description: "1",
    position_order: 1,
    created_at: "2023-07-10",
    updated_at: "2023-07-10",
    is_deleted: false,
  },
  {
    key: "2",
    name: "Session 2",
    course_name: "Advanced CSS",
    created_at: "2023-08-15",
    id: "2",
    course_id: "2",
    lesson: "2",
    user_id: "2",
    description: "2",
    position_order: 2,
    updated_at: "2023-08-15",
    is_deleted: false,
  },
  {
    key: "3",
    name: "Session 3",
    course_name: "React for Beginners",
    created_at: "2023-09-05",
    id: "3",
    course_id: "3",
    lesson: "3",
    user_id: "3",
    description: "3",
    position_order: 3,
    updated_at: "2023-09-05",
    is_deleted: false,
  },
  {
    key: "4",
    name: "Session 4",
    course_name: "Node.js Mastery",
    created_at: "2023-09-20",
    id: "4",
    course_id: "4",
    lesson: "4",
    user_id: "4",
    description: "4",
    position_order: 4,
    updated_at: "2023-09-20",
    is_deleted: false,
  },
  {
    key: "5",
    name: "Session 5",
    course_name: "Python Programming",
    created_at: "2023-10-01",
    id: "5",
    course_id: "5",
    lesson: "5",
    user_id: "5",
    description: "5",
    position_order: 5,
    updated_at: "2023-10-01",
    is_deleted: false,
  },
  {
    key: "6",
    name: "Session 6",
    course_name: "Machine Learning A-Z",
    created_at: "2023-10-15",
    id: "6",
    course_id: "6",
    lesson: "6",
    user_id: "6",
    description: "6",
    position_order: 6,
    updated_at: "2023-10-15",
    is_deleted: false,
  },
  {
    key: "7",
    name: "Session 7",
    course_name: "Docker Essentials",
    created_at: "2023-11-05",
    id: "7",
    course_id: "7",
    lesson: "7",
    user_id: "7",
    description: "7",
    position_order: 7,
    updated_at: "2023-11-05",
    is_deleted: false,
  },
  {
    key: "8",
    name: "Session 8",
    course_name: "Kubernetes Fundamentals",
    created_at: "2023-11-20",
    id: "8",
    course_id: "8",
    lesson: "8",
    user_id: "8",
    description: "8",
    position_order: 8,
    updated_at: "2023-11-20",
    is_deleted: false,
  },
  {
    key: "9",
    name: "Session 9",
    course_name: "AWS Certified Solutions Architect",
    created_at: "2023-12-10",
    id: "9",
    course_id: "9",
    lesson: "9",
    user_id: "9",
    description: "9",
    position_order: 9,
    updated_at: "2023-12-10",
    is_deleted: false,
  },
  {
    key: "10",
    name: "Session 10",
    course_name: "Introduction to SQL",
    created_at: "2023-12-25",
    id: "10",
    course_id: "10",
    lesson: "10",
    user_id: "10",
    description: "10",
    position_order: 10,
    updated_at: "2023-12-25",
    is_deleted: false,
  },
  {
    key: "11",
    name: "Session 11",
    course_name: "Cybersecurity Basics",
    created_at: "2024-01-05",
    id: "11",
    course_id: "11",
    lesson: "11",
    user_id: "11",
    description: "11",
    position_order: 11,
    updated_at: "2024-01-05",
    is_deleted: false,
  },
  {
    key: "12",
    name: "Session 12",
    course_name: "Agile Project Management",
    created_at: "2024-01-20",
    id: "12",
    course_id: "12",
    lesson: "12",
    user_id: "12",
    description: "12",
    position_order: 12,
    updated_at: "2024-01-20",
    is_deleted: false,
  },
  {
    key: "13",
    name: "Session 13",
    course_name: "Intro to Blockchain",
    created_at: "2024-02-10",
    id: "13",
    course_id: "13",
    lesson: "13",
    user_id: "13",
    description: "13",
    position_order: 13,
    updated_at: "2024-02-10",
    is_deleted: false,
  },
  {
    key: "14",
    name: "Session 14",
    course_name: "Fullstack Development",
    created_at: "2024-03-01",
    id: "14",
    course_id: "14",
    lesson: "14",
    user_id: "14",
    description: "14",
    position_order: 14,
    updated_at: "2024-03-01",
    is_deleted: false,
  },
  {
    key: "15",
    name: "Session 15",
    course_name: "Artificial Intelligence",
    created_at: "2024-03-25",
    id: "15",
    course_id: "15",
    lesson: "15",
    user_id: "15",
    description: "15",
    position_order: 15,
    updated_at: "2024-03-25",
    is_deleted: false,
  },
];

const columns: ColumnsType<Session> = [
  {
    title: "Session Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Course Name",
    dataIndex: "course_name",
    key: "course_name",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
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
