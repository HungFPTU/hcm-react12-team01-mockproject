import { useState, useEffect } from "react";
import { Table, Button, Switch } from "antd";
import { Course, CourseStatusEnum } from "../../../../../model/Course";
import { useNavigate } from "react-router-dom";
import { CourseService } from "../../../../../services/CourseService/CourseService";

const CourseTable = () => {
  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [searchTerm] = useState<string>("");

  useEffect(() => {
    // Gọi API để lấy danh sách khóa học
    CourseService.getCourses()
      .then((response) => {
        if (response && response.data && response.data.data) {
          setCoursesData(response.data.data.pageData); // Cập nhật dữ liệu khóa học từ API
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error); // Log lỗi khi gọi API
      });
  }, []);

  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (courseId: string) => {
    navigate(`/instructor/${courseId}`);
  };

  const onChangeStatus = (id: string, status: CourseStatusEnum) => {
    console.log(`Changing status for course ${id} to ${status}`);
    // Xử lý logic thay đổi trạng thái ở đây
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Instructor",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
    {
      title: "Change Status",
      key: "changeStatus",
      render: (_: unknown, record: Course) => (
        <Switch
          checked={record.status === CourseStatusEnum.Active}
          onChange={(checked) =>
            onChangeStatus(
              record.id,
              checked ? CourseStatusEnum.Active : CourseStatusEnum.Inactive
            )
          }
          className="bg-blue-500"
        />
      ),
    },
    {
      title: "Action",
      key: "actions",
      render: (_: unknown, record: Course) => (
        <Button
          onClick={() => handleViewDetails(record.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          View Detail
        </Button>
      ),
    },
  ];

  return (
    <Table<Course>
      columns={columns}
      dataSource={filteredCourses}
      rowKey="id"
      className="w-full shadow-md rounded-lg overflow-hidden"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} của ${total} khóa học`,
      }}
    />
  );
};

export default CourseTable;
