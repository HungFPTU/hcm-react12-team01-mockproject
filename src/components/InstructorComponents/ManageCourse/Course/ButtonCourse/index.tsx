import { useState, useRef } from "react";
import { Button, Modal, Form, Input, Select, Radio, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { CourseService } from "../../../../../services/CourseService/CourseService";

const { Option } = Select;

const ButtonCourse = () => {
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
      // Lấy nội dung từ editor
      const content = editorRef.current ? editorRef.current.getContent() : "";
      console.log(">>>>>>>>>>>values", values);
      const price = Number(values.price);
      const discount = Number(values.discount);
      const category = "6728958bcd80da40c9983f83";

      // Gọi API để tạo khóa học
      const response = await CourseService.createCourse(
        values.courseName,
        category,
        values.description,
        content, // Gửi nội dung đã lấy từ editor
        values.videoUrl,
        values.imageUrl,
        price,
        discount
      );
      message.success("Khóa học đã được tạo thành công!");
      console.log("API Response:", response); // Kiểm tra phản hồi từ API
      setIsModalVisible(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo khóa học!");
      console.error("Error creating course:", error);
    }
  };
  
  return (
    <>
      <Button onClick={showModal} style={{ marginRight: "10px" }}>
        Create Course
      </Button>

      <Modal
        title="Tạo khóa học mới"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="courseName"
            label="Tên khóa học"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Thể loại"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn thể loại">
              <Option value="667d6f9887d3be7cec496e7a">Thể loại 1</Option>
              <Option value="anotherCategoryID">Thể loại 2</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả" labelCol={{ span: 24 }}>
            <Input.TextArea placeholder="Nhập mô tả khóa học" />
          </Form.Item>

          <Form.Item name="content" label="Nội dung" labelCol={{ span: 24 }}>
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

          <Form.Item name="imageUrl" label="Image URL">
            <Input placeholder="Nhập đường dẫn hình ảnh" />
          </Form.Item>

          <Form.Item name="videoUrl" label="Video URL">
            <Input placeholder="Nhập đường dẫn video" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Giá là trường bắt buộc" },
              {
                validator: (_, value) => {
                  if (value && !isNaN(value) && Number(value) >= 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Giá phải là số không âm"));
                },
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Nhập giá khóa học"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ""); // Loại bỏ ký tự không phải số
                e.target.value = value;
              }}
            />
          </Form.Item>

          <Form.Item name="discount" label="Giảm giá" labelCol={{ span: 24 }}>
            <Input
              type="number"
              placeholder="Nhập phần trăm giảm giá (nếu có)"
            />
          </Form.Item>

          <Form.Item
            name="courseType"
            label="Loại khóa học"
            labelCol={{ span: 24 }}
          >
            <Radio.Group>
              <Radio value="free">Miễn phí</Radio>
              <Radio value="paid">Trả phí</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Course
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonCourse;
