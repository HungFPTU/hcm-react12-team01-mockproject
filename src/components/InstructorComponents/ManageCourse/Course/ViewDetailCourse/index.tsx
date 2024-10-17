import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../../../../model/Course';
import Courses from '../../../../../data/Courses.json';
import { Editor } from '@tinymce/tinymce-react';

const ViewDetailCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const course = Courses.courses.find((course) => course.id === courseId);
    if (course) {
      setCourse(course as unknown as Course);
    } else {
      navigate('/instructor/manage-course');
    }
  }, [courseId, navigate]);

  const onFinish = (values: Course) => {
    console.log('Form values:', values);
    // Xử lý cập nhật khóa học ở đây
  };

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleDelete = () => {
    // Xử lý logic xóa khóa học ở đây
    console.log('Xóa khóa học có ID:', courseId);
  };

  if (!course) return <div>Course not found</div>;

  return (
    <div>
      
      <Form
        initialValues={course}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item label="Course ID" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Course Name" name="name" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Category" name="category_id">
          <Select>
            <Select.Option value="cat1">cat1</Select.Option>
            <Select.Option value="cat2">cat2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Content" name="content">
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
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Status_change" name="status_change">
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Sessions" name="session">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Instructor" name="instructor">
          <Input disabled />
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

export default ViewDetailCourse;
