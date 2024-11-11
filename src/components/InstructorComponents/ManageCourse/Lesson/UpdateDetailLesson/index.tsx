import React, { useState,useRef } from 'react';
import { Modal, Input, Form, Button, message, Select } from 'antd';
import { LessonService } from '../../../../../services/LessonService/lesson.service';
import { LessonDetailsResponse } from '../../../../../model/admin/response/Lesson.response';
import { UpdateLessonRequest } from '../../../../../model/admin/request/Lesson.request';
import { LessonTypeEnum } from '../../../../../model/Lesson'; // Đảm bảo rằng bạn import enum này đúng
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

interface UpdateDetailLessonProps {
    lesson: LessonDetailsResponse;
    onClose: () => void;
    onUpdate: () => void;
}

const UpdateDetailLesson: React.FC<UpdateDetailLessonProps> = ({ lesson, onClose, onUpdate }) => {
    const [formData, setFormData] = useState<LessonDetailsResponse>(lesson);
    const navigate = useNavigate();
    const hasMounted = useRef(false);
    const handleSave = async () => {
        if (hasMounted.current) return;
         hasMounted.current = true;
        const lessonId = lesson._id; 
        try {
            const updateData: UpdateLessonRequest = {
                name: formData.name,
                course_id: formData.course_id,
                session_id: formData.session_id,
                lesson_type: formData.lesson_type as LessonTypeEnum,
                description: formData.description || null,
                video_url: formData.video_url || null,
                image_url: formData.image_url || null,
                full_time: formData.full_time,
                position_order: formData.position_order !== null && !isNaN(formData.position_order) ? formData.position_order : 0,
            };
    
            console.log("Data being sent to API:", updateData);
    
            // Gọi API để cập nhật bài học
            await LessonService.updateLesson(lessonId, updateData);
            message.success("Lesson updated successfully!");
            navigate('/instructor/manage-course');
            onUpdate();  // Refresh lesson data sau khi update
            onClose();   // Đóng modal sau khi update
        } catch (error) {
            console.error("Error updating lesson:", error);
            message.error("Failed to update lesson. Please try again.");
        }
    };
    
    


    return (
        <Modal
            title="Update Lesson Details"
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
                <Form.Item label="Name">
                    <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Course Name">
                    <Input
                        value={formData.course_name}
                        onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Session Name">
                    <Input
                        value={formData.session_name}
                        onChange={(e) => setFormData({ ...formData, session_name: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Lesson Type">
                    <Select
                        value={formData.lesson_type}
                        onChange={(value: LessonTypeEnum) => setFormData({ ...formData, lesson_type: value })}
                    >
                        {Object.values(LessonTypeEnum).map((type) => (
                            <Option key={type} value={type}>
                                {type}
                            </Option>
                        ))}
                    </Select>
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
                <Form.Item label="Time">
                    <Input
                        value={formData.full_time}
                        onChange={(e) => setFormData({ ...formData, full_time: Number(e.target.value) })}
                    />
                </Form.Item>
                <Form.Item label="Position Order">
                    <Input
                        value={formData.position_order === null ? "" : formData.position_order} // Hiển thị rỗng nếu position_order là null
                        onChange={(e) => {
                            const value = e.target.value ? Number(e.target.value) : 0; // Nếu không nhập gì thì gán là 0
                            setFormData({ ...formData, position_order: value });
                        }}
                    />
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default UpdateDetailLesson;
