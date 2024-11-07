import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, InputNumber, message } from "antd";
import { LessonService } from "../../../../../services/LessonService/LessionService";
import { CourseService } from "../../../../../services/CourseService/CourseService";
import { SessionService } from "../../../../../services/SessionService/SessionService";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";
import { Session } from "../../../../../model/admin/response/Sesson.response";
import { CreateLessonRequest } from "../../../../../model/admin/request/Lession.request";

const { Option } = Select;

const ButtonLesson = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>(
    []
  );
  const [sessionData, setSessionData] = useState<Session[]>([]);
  const [courseID, setCourseID] = useState<string | null>();
  const [filteredSessionData, setFilteredSessionData] = useState<Session[]>([]);

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

  useEffect(() => {
    SessionService.getSessons()
      .then((response) => {
        if (response && response.data && response.data.data) {
          setSessionData(response.data.data.pageData);
        }
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const newLesson: CreateLessonRequest = {
        name: values.name,
        course_id: values.course_id,
        session_id: values.session_id,
        lesson_type: values.lesson_type,
        description: values.description,
        video_url: values.video_url,
        image_url: values.image_url,
        full_time: values.full_time,
        position_order: values.position_order,
      };

      const response = await LessonService.createLesson(newLesson);
      console.log("API Response:", response);

      // Hiển thị thông báo thành công
      message.success("Bài học đã được tạo thành công!");

      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creating lesson:", error);
      message.error("Không thể tạo bài học, vui lòng thử lại!");
    }
  };

  const handleChange = (courses_id: string) => {
    setCourseID(courses_id);
    setFilteredSessionData(
      sessionData.filter((session) => session.course_id === courses_id)
    );
  };

  return (
    <>
      <Button onClick={showModal} style={{ marginRight: "10px" }}>
        Create Lesson
      </Button>

      <Modal
        title="Tạo bài học mới"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên bài học"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              placeholder="Nhập tên bài học"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="course_id"
            label="Tên khóa học"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn khóa học" onChange={handleChange}>
              {coursesData.map((courses) => (
                <Select.Option key={courses._id} value={courses._id}>
                  {courses.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="session_id"
            label="Session"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn session" disabled={!courseID}>
              {filteredSessionData.map((session) => (
                <Select.Option key={session._id} value={session._id}>
                  {session.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="lesson_type"
            label="Loại bài học"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value="video">Video</Option>
              <Option value="text">Text</Option>
              <Option value="audio">Audio</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả" labelCol={{ span: 24 }}>
            <Input.TextArea
              placeholder="Nhập mô tả bài học"
              style={{ width: "100%", height: "100px" }}
            />
          </Form.Item>

          <Form.Item
            name="video_url"
            label="Video URL"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Vui lòng nhập URL của video" }]}
          >
            <Input placeholder="Nhập URL video" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="full_time" label="Full Time" labelCol={{ span: 24 }}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="position_order"
            label="Position Order"
            labelCol={{ span: 24 }}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Lesson
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonLesson;
