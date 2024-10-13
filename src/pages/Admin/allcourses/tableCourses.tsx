import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Courses } from "../../../model/Courses";
import SearchComponent from "../../../components/StudentComponents/search";

const dataSource: Courses[] = [
  {
    Name: "JavaScript Basics",
    CategoryName: "Web Development",
    Status: "Active",
    Price: 300,
    Discount: 10,
    CreatedAt: "2023-01-15",
  },
  {
    Name: "Advanced CSS",
    CategoryName: "Web Design",
    Status: "REJECT",
    Price: 200,
    Discount: 20,
    CreatedAt: "2023-02-22",
  },
  {
    Name: "React for Beginners",
    CategoryName: "Frontend Development",
    Status: "Active",
    Price: 400,
    Discount: 15,
    CreatedAt: "2023-03-12",
  },
  {
    Name: "Node.js Mastery",
    CategoryName: "Backend Development",
    Status: "REJECT",
    Price: 450,
    Discount: 25,
    CreatedAt: "2023-04-08",
  },
  {
    Name: "Python Programming",
    CategoryName: "Programming Languages",
    Status: "Active",
    Price: 500,
    Discount: 30,
    CreatedAt: "2023-05-30",
  },
  {
    Name: "Machine Learning A-Z",
    CategoryName: "Data Science",
    Status: "Active",
    Price: 600,
    Discount: 35,
    CreatedAt: "2023-06-12",
  },
  {
    Name: "Docker Essentials",
    CategoryName: "DevOps",
    Status: "WAITING_APPROVE",
    Price: 350,
    Discount: 10,
    CreatedAt: "2023-07-15",
  },
  {
    Name: "Kubernetes Fundamentals",
    CategoryName: "Cloud Computing",
    Status: "Active",
    Price: 650,
    Discount: 20,
    CreatedAt: "2023-08-20",
  },
  {
    Name: "AWS Certified Solutions Architect",
    CategoryName: "Cloud Computing",
    Status: "WAITING_APPROVE",
    Price: 700,
    Discount: 40,
    CreatedAt: "2023-09-05",
  },
  {
    Name: "Introduction to SQL",
    CategoryName: "Database Management",
    Status: "Active",
    Price: 150,
    Discount: 5,
    CreatedAt: "2023-10-10",
  },
  {
    Name: "Cybersecurity Basics",
    CategoryName: "Security",
    Status: "WAITING_APPROVE",
    Price: 550,
    Discount: 30,
    CreatedAt: "2023-11-18",
  },
  {
    Name: "Agile Project Management",
    CategoryName: "Project Management",
    Status: "Active",
    Price: 250,
    Discount: 15,
    CreatedAt: "2023-12-02",
  },
  {
    Name: "Intro to Blockchain",
    CategoryName: "Cryptocurrency",
    Status: "WAITING_APPROVE",
    Price: 800,
    Discount: 25,
    CreatedAt: "2024-01-05",
  },
  {
    Name: "Fullstack Development",
    CategoryName: "Web Development",
    Status: "Active",
    Price: 1000,
    Discount: 50,
    CreatedAt: "2024-02-17",
  },
  {
    Name: "Artificial Intelligence",
    CategoryName: "Data Science",
    Status: "WAITING_APPROVE",
    Price: 1200,
    Discount: 40,
    CreatedAt: "2024-03-25",
  },
];

const columns: ColumnsType<Courses> = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "CategoryName",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "Status",
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
    dataIndex: "Price",
    key: "price",
    render: (price) => `$${price}`,
  },
  {
    title: "Discount (%)",
    dataIndex: "Discount",
    key: "discount",
  },
  {
    title: "Created At",
    dataIndex: "CreatedAt",
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
