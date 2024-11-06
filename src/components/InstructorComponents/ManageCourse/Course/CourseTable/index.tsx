import { useState, useEffect } from "react";
import { Table, Button, Switch, message } from "antd";
import { Course, CourseStatusEnum } from "../../../../../model/Course";
import { useNavigate } from "react-router-dom";
import { CourseService } from "../../../../../services/CourseService/CourseService";
import { SendOutlined } from '@ant-design/icons'; // Import Send icon from Ant Design

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

  const handleSendClick = async (courseId: string) => {
    try {
      // Gọi API để thay đổi trạng thái khóa học
      await CourseService.changeStatus({
        course_id: courseId,
        new_status: CourseStatusEnum.WaitingApprove, // Đặt trạng thái là "waiting_approve"
      });

      // Cập nhật lại trạng thái khóa học trong bảng chỉ cho khóa học được nhấn
      setCoursesData((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId
            ? { ...course, status: CourseStatusEnum.WaitingApprove }
            : course
        )
      );

      // Hiển thị thông báo thành công
      message.success("Course status updated to Waiting Approve!");
    } catch (error) {
      message.error("Failed to update course status!");
      console.error("Error changing status:", error);
    }
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
        <div className="flex space-x-2">
          {/* View Details Button */}
          <Button
            onClick={() => handleViewDetails(record.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            View Detail
          </Button>

          {/* Send Button */}
          <Button
            icon={<SendOutlined />} // Using the Send icon
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => handleSendClick(record.id)} // Call the API when clicked
          />
        </div>
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
