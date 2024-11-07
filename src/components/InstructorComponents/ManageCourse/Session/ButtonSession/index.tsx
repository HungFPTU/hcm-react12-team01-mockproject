import { useState, useRef } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { SessionService } from "../../../../../services/SessionService/SessionService";

const ButtonSession = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const editorRef = useRef<any>(null); // Tham chiếu đến TinyMCE editor

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
      const positionOrder = Number(values.positionOrder);

      // Lấy nội dung từ editor
      const description = editorRef.current
        ? editorRef.current.getContent()
        : "";
      const { sessionName, } = values;
      const courseId = "672a25c36ee2db309c2d4ee4";
      // Gọi API để tạo session mới
      const response = await SessionService.createSession(
        sessionName,
        courseId,
        description,
        positionOrder
      );

      message.success("Session đã được tạo thành công!");
      console.log("API Response:", response); // Kiểm tra phản hồi từ API
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
            label="Course ID"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Vui lòng nhập ID khóa học" }]}
          >
            <Input placeholder="Nhập ID khóa học" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            labelCol={{ span: 24 }}
          >
            <Editor
              onInit={(_evt, editor) => (editorRef.current = editor)} // Lưu tham chiếu đến editor
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
                const value = e.target.value.replace(/[^0-9]/g, ""); // Loại bỏ ký tự không phải số
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