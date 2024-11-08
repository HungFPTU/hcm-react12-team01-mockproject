import { useState,  useEffect } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { SessionService } from "../../../../../services/SessionService/SessionService";
import { CourseService } from "../../../../../services/CourseService/CourseService";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";

const { Option } = Select;

const ButtonSession = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>(
    []
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    CourseService.getCourses()
      .then((response) => {
        if (response && response.data && response.data.data) {
          setCoursesData(response.data.data.pageData);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const positionOrder = Number(values.positionOrder);
      const description = values.description || "";
      const { sessionName, courseId } = values;

      const response = await SessionService.createSession(
        sessionName,
        courseId,
        description,
        positionOrder
      );
      console.log("API Response:", response); // Kiểm tra phản hồi từ API
      message.success("Session đã được tạo thành công!");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo session!");
      console.error("Error creating session:", error);
    }
  };

  return (
    <>
      <Button onClick={showModal} style={{ marginRight: "10px" }}>
        Create Session
      </Button>

      <Modal
        title="Create Session"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="sessionName"
            label="Session Name"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Vui lòng nhập tên session" }]}
          >
            <Input placeholder="Nhập tên session" />
          </Form.Item>

          <Form.Item
            name="courseId"
            label="Course "
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Vui lòng chọn khóa học" }]}
          >
            <Select placeholder="Chọn khóa học">
              {coursesData.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            labelCol={{ span: 24 }}
          >
            <Input.TextArea
              placeholder="Nhập mô tả"
              style={{ width: "100%", height: "100px" }}
            />
          </Form.Item>

          <Form.Item
            name="positionOrder"
            label="Position Order"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Vui lòng nhập thứ tự vị trí" },
              {
                validator: (_, value) => {
                  if (value && !isNaN(value) && Number(value) >= 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Thứ tự vị trí phải là số không âm")
                  );
                },
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Nhập thứ tự vị trí"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                e.target.value = value;
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Session
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonSession;
