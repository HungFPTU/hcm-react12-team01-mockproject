import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, InputNumber, Select, Upload } from 'antd';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Lesson } from '../../../../../model/Lesson';
import Lessons from '../../../../../data/Lessons.json';
import { UploadOutlined } from '@ant-design/icons';

const ViewDetailLesson = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lesson = Lessons.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setLesson(lesson as unknown as Lesson);
    } else {
      navigate('/instructor/manage-course/session');
    }
  }, [lessonId, navigate]);

  const onFinish = (values: Lesson) => {
    console.log('Form values:', values);
    // Xử lý cập nhật khóa học ở đây
  };

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleDelete = () => {
    // Xử lý logic xóa khóa học ở đây
    console.log('Xóa khóa học có ID:', lessonId);
  };

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div>
      <Form
        initialValues={lesson}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item label="Lesson Name" name="name" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Course Name" name="courseName" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="Session Name" name="sessionName" rules={[{ required: true }]}>
          <Input disabled/>
        </Form.Item>
        <Form.Item label="Lesson Type" name="lesson_type" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Text">Text</Select.Option>
            <Select.Option value="Video">Video</Select.Option>
            <Select.Option value="Audio">Audio</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
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
        <Form.Item label="Created At" name="created_at">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Media" name="media">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Full Time" name="full_time" rules={[{ required: true }]}>
          <InputNumber/>
        </Form.Item>
        <Form.Item label="Position Order" name="position_order" rules={[{ required: true }]}>
          <InputNumber/>
        </Form.Item>
      </Form>
      <div className='flex justify-between gap-2'>
        <div className='flex gap-2'>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Button onClick={handleDelete} type="primary" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </div>
        <div>
          <Button onClick={handleGoBack} icon={<LeftOutlined />}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailLesson;
