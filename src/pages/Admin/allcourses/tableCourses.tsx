import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Course, CourseStatusEnum } from "../../../model/Course";
import SearchComponent from "../../../components/StudentComponents/search";

const dataSource: Partial<Course>[] = [
  {
    name: "JavaScript Basics",
    categoryName: "Web Development",
    status: CourseStatusEnum.Active,
    price: 300,
    discount: 10,
    created_at: "2023-01-15",
  },
  {
      name: "Advanced CSS",
    categoryName: "Web Design",
    status: CourseStatusEnum.Rejected,
    price: 200,
    discount: 20,
    created_at: "2023-02-22",
  },
  {
    name: "React for Beginners",
    categoryName: "Frontend Development",
    status: CourseStatusEnum.Active,
    price: 400,
    discount: 15,
    created_at: "2023-03-12",
  },
  {
    name: "Node.js Mastery",
    categoryName: "Backend Development",
    status: CourseStatusEnum.Rejected,
    price: 450,
    discount: 25,
    created_at: "2023-04-08",
  },
  {
    name: "Python Programming",
    categoryName: "Programming Languages",
    status: CourseStatusEnum.Active,
    price: 500,
    discount: 30,
    created_at: "2023-05-30",
  },
  {
    name: "Machine Learning A-Z",
    categoryName: "Data Science",
    status: CourseStatusEnum.Active,
    price: 600,
    discount: 35,
    created_at: "2023-06-12",
  },
  {
    name: "Docker Essentials",
    categoryName: "DevOps",
    status: CourseStatusEnum.WaitingApprove,
    price: 350,
    discount: 10,
    created_at: "2023-07-15",
  },
  {
    name: "Kubernetes Fundamentals",
    categoryName: "Cloud Computing",
    status: CourseStatusEnum.Active,
    price: 650,
    discount: 20,
    created_at: "2023-08-20",
  },
  {
    name: "AWS Certified Solutions Architect",
    categoryName: "Cloud Computing",
    status: CourseStatusEnum.WaitingApprove,
    price: 700,
    discount: 40,
    created_at: "2023-09-05",
  },
  {
    name: "Introduction to SQL",
    categoryName: "Database Management",
    status: CourseStatusEnum.Active,
    price: 150,
    discount: 5,
    created_at: "2023-10-10",
  },
  {
    name: "Cybersecurity Basics",
    categoryName: "Security",
    status: CourseStatusEnum.WaitingApprove,
    price: 550,
    discount: 30,
    created_at: "2023-11-18",
  },
  {
    name: "Agile Project Management",
    categoryName: "Project Management",
    status: CourseStatusEnum.Active,
    price: 250,
    discount: 15,
    created_at: "2023-12-02",
  },
  {
    name: "Intro to Blockchain",
    categoryName: "Cryptocurrency",
    status: CourseStatusEnum.WaitingApprove,
    price: 800,
    discount: 25,
    created_at: "2024-01-05",
  },
  {
    name: "Fullstack Development",
    categoryName: "Web Development",
    status: CourseStatusEnum.Active,
    price: 1000,
    discount: 50,
    created_at: "2024-02-17",
  },
  {
    name: "Artificial Intelligence",
    categoryName: "Data Science",
    status: CourseStatusEnum.WaitingApprove,
    price: 1200,
    discount: 40,
    created_at: "2024-03-25",
  },
];

const columns: ColumnsType<Partial<Course>> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      if (status === "Active") {
        return <Tag color="green">{status}</Tag>;
      } else if (status == "WAITING_APPROVE") {
        return <Tag color="gold">{status}</Tag>;
      } else {
        return <Tag color="red">{status}</Tag>;
      }
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `$${price}`,
  },
  {
    title: "Discount (%)",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "createdAt",
  },
];

function TableCourses() {
  const handleSearch = () => {
    console.log("test");
  };
  return (
    <div>
      <div style={{ paddingBottom: "12px" }}>
        <SearchComponent
          placeholder="Search by Courses"
          onSearch={handleSearch}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default TableCourses;
