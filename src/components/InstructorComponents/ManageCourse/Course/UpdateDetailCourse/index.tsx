import React, { useState } from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import { CourseService } from '../../../../../services/CourseService/course.service';
import { GetCourseByIdResponse } from '../../../../../model/admin/response/Course.response';
import { UpdateCourseRequest } from '../../../../../model/admin/request/Course.request';
import { useNavigate } from 'react-router-dom';


interface UpdateDetailCourseProps {
  course: GetCourseByIdResponse;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateDetailCourse: React.FC<UpdateDetailCourseProps> = ({ course, onClose}) => {
  const [formData, setFormData] = useState<GetCourseByIdResponse>(course);
  const navigate = useNavigate();



  const handleSave = async () => {
    try {
      const updateData: UpdateCourseRequest = {
        name: formData.name,
        category_id: formData.category_id,
        description: formData.description,
        content: formData.content,
        video_url: formData.video_url,
        image_url: formData.image_url,
        price: formData.price,
        discount: formData.discount,
      };
  
     
      await CourseService.updateCourse(course._id, updateData);
      message.success("Course updated successfully!");
      navigate('/instructor/manage-course');
    } catch (error) {
      console.error("Failed to update course. Please try again.", error);
      message.error("Failed to update course. Please try again.");
    }
  };

  return (
    <Modal
      title="Update Course Details"
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Item>
       
        <Form.Item label="Price">
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          />
        </Form.Item>
        <Form.Item label="Discount">
          <Input
            type="number"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
          />
        </Form.Item>
        <Form.Item label="Video URL">
          <Input
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Image URL">
          <Input
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Content">
          <Input.TextArea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateDetailCourse;
