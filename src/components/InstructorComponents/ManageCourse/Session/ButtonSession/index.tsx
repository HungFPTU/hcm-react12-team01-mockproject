import { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Input, Select, message, Spin } from "antd";
import { SessionService } from "../../../../../services/SessionService/session.service";
import { CourseService } from "../../../../../services/CourseService/course.service";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";
import { GetCourseRequest } from "../../../../../model/admin/request/Course.request";
import { CreateSessionRequest } from "../../../../../model/admin/request/Sesson.request";

const { Option } = Select;

const ButtonSession = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>(
    []
  );
  const hasMounted = useRef(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch courses:", error);
    }
  };

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    const fetchCoursesData = async () => {
      try {
        setLoading(true);
        const searchCondition = {
          keyword: searchQuery,
          category_id: "",
          status: undefined,
          is_delete: false,
        };

        const response = await fetchCourse({
          searchCondition,
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        });

        if (response && response.success) {
          setLoading(false);

          const data = response.data.pageData;
          setCoursesData(data);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, [searchQuery]);

  const handleSubmit = async (values: any) => {
    try {
      const positionOrder = values.positionOrder
        ? Number(values.positionOrder)
        : 1;
      const description = values.description || "";
      const { sessionName: name, course_id } = values;
  
      // Create an object that matches CreateSessionRequest
      const params: CreateSessionRequest = {
        name,
        course_id,
        description,
        positionOrder,
      };
  
      // Call the createSession method with the params object
      const response = await SessionService.createSession(params);
  
      if (response && response.data.success) {
        console.log("API Response:", response); // Check API response
        message.success("Session đã được tạo thành công!");
      }
  
      setIsModalVisible(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo session!");
      console.error("Error creating session:", error);
    }
  };
  
  if (loading) return <Spin tip="Loading course details..." />;

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
            name="course_id"
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
          >
            <Input type="number" placeholder="Nhập thứ tự vị trí " />
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
