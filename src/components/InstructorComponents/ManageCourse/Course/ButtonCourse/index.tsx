import { useState } from 'react';
import { Button, Modal, Form, Input, Select, Radio, Upload, message } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { Course } from '../../../../../model/Course';

const { Option } = Select;

const ButtonCourse = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: Course) => {
    console.log('Submitted values:', values);
    setIsModalVisible(false);
  };

  const handleRequestApproval = () => {
    console.log('Gửi yêu cầu duyệt khóa học');
    message.success('Đã gửi yêu cầu duyệt khóa học lên admin');
  };

  return (
    <>
      <Button onClick={showModal} style={{ marginRight: '10px' }}>Create Course</Button>
      <Button onClick={handleRequestApproval} type="primary">Send Request</Button>
      
      <Modal
        title="Tạo khóa học mới"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name="courseName" label="Tên khóa học" labelCol={{
            span: 24,
          }} rules={[{ required: true }]}>
            <Input.TextArea style={{width: '100%', height: '20px'}}/>
          </Form.Item>

          <Form.Item name="category" label="Thể loại" labelCol={{
            span: 24,
          }} rules={[{ required: true }]}>
            <Select style={{width: '100%'}}>
              <Option value="category1">Thể loại 1</Option>
              <Option value="category2">Thể loại 2</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả" labelCol={{
            span: 24,
          }}>
            <Input.TextArea style={{width: '100%', height: '20px'}}/>
          </Form.Item>

          <Form.Item name="content" label="Nội dung" labelCol={{
            span: 24,
          }}>
            <Editor
              apiKey="8pum9vec37gu7gir1pnpc24mtz2yl923s6xg7x1bv4rcwxpe"
              init={{
                width: '100%',
                height: 300,
                plugins: [
                  'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                  'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
                  'table', 'emoticons', 'help'
                ],
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                  'forecolor backcolor emoticons | help',
                menubar: 'file edit view insert format tools table help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
              }}
            />
          </Form.Item>

          <Form.Item name="image" label="Image">
            <Upload>
              <Button>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="video" label="Video">
            <Upload>
              <Button>Upload Video</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="courseType" label="Course Type">
            <Radio.Group>
              <Radio value="free">Free</Radio>
              <Radio value="paid">Paid</Radio>
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
