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
          <Form.Item name="lessonName" label="Tên bài học" labelCol={{
            span: 24,
          }} rules={[{ required: true }]}>
            <Input.TextArea style={{height: '20px', width: '100%'}}/>
        </Form.Item>
        <Form.Item name="courseName" label="Tên khóa học" labelCol={{
            span: 24,
          }} rules={[{ required: true }]}>
          <Input.TextArea disabled={true} style={{height: '20px', width: '100%'}}/>
        </Form.Item>
        <Form.Item name="session" label="Session" labelCol={{
            span: 24,
          }} rules={[{ required: true }]}>
          <Input.TextArea disabled style={{height: '20px', width: '100%'}}/>
        </Form.Item>

        <Form.Item name="type" label="Loại bài học" labelCol={{
            span: 24,
          }} rules={[{ required: true }]}>
            <Select style={{width: '100%'}}>
              <Option value="video">Video</Option>
              <Option value="text">Text</Option>
              <Option value="audio">Audio</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả" labelCol={{
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

          <Form.Item name="video" label="Video">
            <Upload>
              <Button>Upload Video</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="fullTime" label="Full Time" labelCol={{
            span: 24,
          }}>
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>

          <Form.Item name="position" label="Position" labelCol={{
            span: 24,
          }}>
            <InputNumber style={{width: '100%'}}/> 
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
