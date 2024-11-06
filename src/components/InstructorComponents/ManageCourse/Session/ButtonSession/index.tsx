import { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Input, message, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { CourseService } from "../../../../../services/CourseService/CourseService";
import { SessionService } from "../../../../../services/SessionService/SessionService";

interface Course {
  _id: string;
  name: string;
  session: string;
  categoryName: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

const ButtonSession = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const editorRef = useRef<any>(null);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      const positionOrder = Number(values.positionOrder);
      const courseId = values.courseId;

      const description = editorRef.current
        ? editorRef.current.getContent()
        : "";
      const { sessionName } = values;

      const response = await SessionService.createSession(
        sessionName,
        courseId,
        description,
        positionOrder
      );

      if (response) {
        message.success("Session đã được tạo thành công!");
        setIsModalVisible(false);
      }
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
            label="Course"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Vui lòng chọn khóa học" }]}
          >
            <Select placeholder="Chọn khóa học">
              {coursesData.map((courses) => (
                <Select.Option key={courses._id} value={courses._id}>
                  {courses.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            labelCol={{ span: 24 }}
          >
            <Editor
              onInit={(_evt, editor) => (editorRef.current = editor)}
              apiKey="8pum9vec37gu7gir1pnpc24mtz2yl923s6xg7x1bv4rcwxpe"
              init={{
                width: "100%",
                height: 300,
                plugins: [
                  "advlist",
                  "autolink",
                  "link",
                  "image",
                  "lists",
                  "charmap",
                  "preview",
                  "anchor",
                  "pagebreak",
                  "searchreplace",
                  "wordcount",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "emoticons",
                  "help",
                ],
                toolbar:
                  "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | link image | print preview media fullscreen | " +
                  "forecolor backcolor emoticons | help",
                menubar: "file edit view insert format tools table help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
              }}
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
