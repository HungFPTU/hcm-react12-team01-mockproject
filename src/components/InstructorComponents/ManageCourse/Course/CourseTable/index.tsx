import { useState, useEffect } from "react";
import { Table, Button, Switch, Modal, Input, Form } from "antd";
import { CourseStatusEnum } from "../../../../../model/Course";
import { CourseService } from "../../../../../services/CourseService/CourseService";

interface Course {
  _id: string;
  name: string;
  session: string;
  category_name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

const CourseTable = () => {
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [searchTerm] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");

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

  const handleUpdate = (courseId: string) => {
    CourseService.getCourse(courseId)
      .then((response) => {
        if (response && response.data && response.data.data) {
          const course = response.data.data;
          setSelectedCourse(course);

          // Tìm `category_name` tương ứng với `category_id`
          const categoryName = coursesData.find(
            (c) => c.category_id === course.category_id
          )?.category_name;
          setSelectedCategoryName(categoryName || ""); // Gán `category_name` nếu tìm thấy

          setIsModalVisible(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });
  };

  const handleDelete = (courseId: string) => {
    console.log(`Deleting course with ID: ${courseId}`);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedCourse(null);
    setSelectedCategoryName("");
  };

  const onChangeStatus = (id: string, status: CourseStatusEnum) => {
    console.log(`Changing status for course ${id} to ${status}`);
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
              record._id,
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
        <>
          <Button
            onClick={() => handleUpdate(record._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white mr-2"
          >
            Update
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table<Course>
        columns={columns}
        dataSource={filteredCourses}
        rowKey="_id"
        className="w-full shadow-md rounded-lg overflow-hidden"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} khóa học`,
        }}
      />
      <Modal
        title="Update Course"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {selectedCourse && (
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input defaultValue={selectedCourse.name} />
            </Form.Item>

            <Form.Item label="Category">
              <Input value={selectedCategoryName} readOnly />
            </Form.Item>

            <Form.Item label="Description">
              <Input defaultValue={selectedCourse.description} />
            </Form.Item>

            <Form.Item label="Content">
              <Input defaultValue={selectedCourse.content} />
            </Form.Item>

            <Form.Item label="Video">
              {selectedCourse.video_url &&
              selectedCourse.video_url.includes("youtube.com") ? (
                <iframe
                  width="100%"
                  height="315"
                  src={selectedCourse.video_url.replace("watch?v=", "embed/")}
                  title="Course Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video width="100%" height="315" controls>
                  <source src={selectedCourse.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </Form.Item>

            <Form.Item label="Image URL">
              <Input defaultValue={selectedCourse.image_url} />
              {selectedCourse.image_url && (
                <img
                  src={selectedCourse.image_url}
                  alt="Course Image"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Form.Item>

            <Form.Item label="Price">
              <Input defaultValue={selectedCourse.price} />
            </Form.Item>

            <Form.Item label="Discount">
              <Input defaultValue={selectedCourse.discount} />
            </Form.Item>

            <Button
              type="primary"
              onClick={() => console.log("Updating course...")}
              className="w-full"
            >
              Save Changes
            </Button>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default CourseTable;
