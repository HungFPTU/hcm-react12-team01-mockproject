import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CourseDetails } from '../../../../../model/Course';

interface CourseValues {
  title?: string;
  description?: string;
  // Thêm các trường khác nếu cần
}

const ViewDetailCourse: React.FC<{ courseId: string }> = ({ courseId }) => {
  const [course] = useState<CourseDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
  }, [courseId]);

  const onFinish = (values: CourseValues) => {
    // Xử lý cập nhật thông tin khóa học
    console.log('Updated course:', values);
  };

  const handleDelete = () => {
    // Xử lý logic xóa khóa học ở đây
    console.log('Xóa khóa học');
  };

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <Button onClick={handleGoBack} icon={<LeftOutlined />}>
        Back
      </Button>
      
      <Form
        initialValues={course}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item label="Course ID" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        {/* Thêm các Form.Item khác cho các trường thông tin khác */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
      
      <Button onClick={handleDelete} type="primary" danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    </div>
  );
};

export default ViewDetailCourse;
