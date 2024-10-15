import { useState } from 'react';
import { Button, Modal, Form, Input, Select, Upload, InputNumber } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { Lesson } from '../../../../../model/Lesson';

const { Option } = Select;

const ButtonLesson = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: Lesson) => {
    console.log('Submitted values:', values);
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal} style={{ marginRight: '10px' }}>Create Lesson</Button>
      
      <Modal
        title="Tạo bài học mới"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name="lessonName" label="Tên bài học" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="courseName" label="Tên khóa học" rules={[{ required: true }]}>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item name="session" label="Session" rules={[{ required: true }]}>
          <Input disabled/>
        </Form.Item>

        <Form.Item name="type" label="Loại bài học" rules={[{ required: true }]}>
            <Select>
              <Option value="video">Video</Option>
              <Option value="text">Text</Option>
              <Option value="audio">Audio</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
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

          <Form.Item name="video" label="Video">
            <Upload>
              <Button>Upload Video</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="fullTime" label="Full Time">
            <InputNumber/>
          </Form.Item>

          <Form.Item name="position" label="Position">
            <InputNumber/>
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
