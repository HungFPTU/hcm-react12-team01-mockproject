import React, { useEffect, useState, useRef } from 'react';
import { Modal, Input, Form, Button, message, Select, Spin } from 'antd';
import { LessonService } from '../../../../../services/LessonService/lesson.service';
import { CourseService } from '../../../../../services/CourseService/course.service';
import { SessionService } from '../../../../../services/SessionService/session.service';
import { LessonDetailsResponse } from '../../../../../model/admin/response/Lesson.response';
import { UpdateLessonRequest } from '../../../../../model/admin/request/Lesson.request';
import { LessonTypeEnum } from '../../../../../model/Lesson';

const { Option } = Select;

interface UpdateDetailLessonProps {
    lesson: LessonDetailsResponse;
    onClose: () => void;
    onUpdate: () => void;
}

const UpdateDetailLesson: React.FC<UpdateDetailLessonProps> = ({ lesson, onClose, onUpdate }) => {
    const [formData, setFormData] = useState<LessonDetailsResponse>(lesson);
    const [coursesData, setCoursesData] = useState<any[]>([]);
    const [sessionsData, setSessionsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const hasMounted = useRef(false);

    const fetchCourses = async () => {
        try {
            const response = await CourseService.getCourse({
                searchCondition: { keyword: '', category_id: '', status: undefined, is_delete: false },
                pageInfo: { pageNum: 1, pageSize: 10 },
            });
            if (response?.data?.success) {
                setCoursesData(response.data.data.pageData);
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    const fetchSessions = async () => {
        try {
            const response = await SessionService.getSessions({
                searchCondition: { keyword: '', is_position_order: false, is_delete: false },
                pageInfo: { pageNum: 1, pageSize: 10 },
            });
            if (response.data?.success && response.data.data?.pageData) {
                setSessionsData(response.data.data.pageData);
            }
        } catch (error) {
            console.error("Failed to fetch sessions:", error);
        }
    };

    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchCourses(), fetchSessions()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSave = async () => {
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
                position_order: formData.position_order || 0,
            };

            await LessonService.updateLesson(lessonId, updateData);
            message.success("Lesson updated successfully!");
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Error updating lesson:", error);
            message.error("Failed to update lesson. Please try again.");
        }
    };

    if (loading) {
        return <Spin tip="Loading..." />;
    }

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
                <Form.Item label="Course">
                    <Select
                        value={formData.course_id}
                        onChange={(value) => setFormData({ ...formData, course_id: value })}
                    >
                        {coursesData.map((course) => (
                            <Option key={course._id} value={course._id}>
                                {course.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Session">
                    <Select
                        value={formData.session_id}
                        onChange={(value) => setFormData({ ...formData, session_id: value })}
                    >
                        {sessionsData.map((session) => (
                            <Option key={session._id} value={session._id}>
                                {session.name}
                            </Option>
                        ))}
                    </Select>
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
                        type="number"
                        value={formData.full_time}
                        onChange={(e) => setFormData({ ...formData, full_time: Number(e.target.value) })}
                    />
                </Form.Item>
                <Form.Item label="Position Order">
                    <Input
                        type="number"
                        value={formData.position_order || 0}
                        onChange={(e) => setFormData({ ...formData, position_order: Number(e.target.value) })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateDetailLesson;
