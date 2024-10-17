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
          <Form.Item name="courseName" label="Tên khóa học" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category" label="Thể loại" rules={[{ required: true }]}>
            <Select>
              <Option value="category1">Thể loại 1</Option>
              <Option value="category2">Thể loại 2</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="content" label="Nội dung">
            <Editor
              apiKey="8pum9vec37gu7gir1pnpc24mtz2yl923s6xg7x1bv4rcwxpe"
              init={{
                height: 300,
                menubar: 'favs file edit view insert format tools table help',
                menu: {
                  favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
                },  
                plugins: [
                  'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                  'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                  'media', 'table', 'emoticons', 'help'
                ],
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                  'forecolor backcolor emoticons | help',
                content_css: 'css/content.css'
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
