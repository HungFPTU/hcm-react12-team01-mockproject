import React, { useEffect, useState, useRef } from 'react';
import { Modal, Input, Form, Button, message, Select, Spin, Upload } from 'antd';
import { LessonService } from '../../../../../services/LessonService/lesson.service';
import { CourseService } from '../../../../../services/CourseService/course.service';
import { LessonDetailsResponse } from '../../../../../model/admin/response/Lesson.response';
import { UpdateLessonRequest } from '../../../../../model/admin/request/Lesson.request';
import { LessonTypeEnum } from '../../../../../model/Lesson';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile } from '../../../../../firebase-config';

const { Option } = Select;

interface UpdateDetailLessonProps {
    lesson: LessonDetailsResponse;
    onClose: () => void;
    onUpdate: () => void;
}
const UpdateDetailLesson: React.FC<UpdateDetailLessonProps> = ({ lesson, onClose, onUpdate }) => {
    const [formData, setFormData] = useState<LessonDetailsResponse>(lesson);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<any[]>([]);
    const hasMounted = useRef(false);
    
    useEffect(() => {
        setFormData(lesson);
    }, [lesson]);

    const fetchCourses = async () => {
        try {
            const response = await CourseService.getCourse({
                searchCondition: { keyword: '', category_id: '', status: undefined, is_delete: false },
                pageInfo: { pageNum: 1, pageSize: 10 },
            });
            if (response?.data?.success) {
                setCourses(response.data.data.pageData);
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchCourses()]);
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
                user_id: formData.user_id,
                lesson_type: formData.lesson_type as LessonTypeEnum,
                description: formData.description || null,
                video_url: formData.video_url || "", 
                image_url: formData.image_url || "", 
                full_time: formData.full_time,
                position_order: formData.position_order || 0,
            };
    
            console.log('Submitting update data:', updateData);
    
            const response = await LessonService.updateLesson(lessonId, updateData);
    
            if (response?.data?.success) {
                message.success("Lesson updated successfully!");
                onUpdate();
                onClose();
            } else if (response?.data?.errors) {
                console.log('API Errors:', response.data.errors);
    
                response.data.errors.forEach((error) => console.log('API Error Detail:', error));
    
                response.data.errors.forEach((err: { message: string, field: string }) => {
                    if (err.field === "course_id") {
                        message.error("The selected course cannot be used!");
                    }
                    if (err.field === "session_id") {
                        message.error("The selected session cannot be used!");
                    }
                    if (err.field === "video_url") {
                        message.error("Video URL must be a valid string!");
                    }
                    if (err.field === "image_url") {
                        message.error("Image URL must be a valid string!");
                    }
                });
            }
        } catch (error) {
            console.error("Error updating lesson:", error);
            message.error("Failed to update lesson. Please try again.");
        }
    };
    

    const handleFileChange = async (info: any, type: 'image' | 'video') => {
        if (info.file.status === 'uploading') {
            message.loading({ content: `Uploading ${type}...`, key: 'upload' });
        }
        if (info.file.status === 'done') {
            const file = info.file.originFileObj;
            try {
                const fileUrl = await uploadFile(file, file.name); 
                setFormData({ ...formData, [`${type}_url`]: fileUrl || "" }); // Đảm bảo giá trị là chuỗi rỗng nếu không có file URL
                message.success({ content: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`, key: 'upload' });
            } catch (error) {
                message.error("Failed to upload file");
            }
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
                        value={formData.course_id} // Đây là giá trị đang được chọn
                        onChange={(value) => setFormData({ ...formData, course_id: value })} // Khi thay đổi sẽ cập nhật `course_id` trong `formData`
                    >
                        {courses.map((course) => (
                            <Option key={course._id} value={course._id}>
                                {course.name}
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

                {formData.lesson_type === LessonTypeEnum.Video && (
                    <>
                        <Form.Item label="Video">
                            <Upload
                                accept="video/*"
                                showUploadList={false}
                                customRequest={({ onSuccess }) => {
                                    setTimeout(() => {
                                        if (onSuccess) {
                                            onSuccess("ok");
                                        }
                                    }, 0);
                                }}
                                onChange={(info) => handleFileChange(info, 'video')}
                            >
                                <Button icon={<UploadOutlined />}>Upload Video</Button>
                            </Upload>
                        </Form.Item>
                        {formData.video_url && (
                            <video src={formData.video_url} controls style={{ width: '100%', marginTop: '10px' }} />
                        )}
                    </>
                )}

                {formData.lesson_type === LessonTypeEnum.Image && (
                    <>
                        <Form.Item label="Image">
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                customRequest={({ onSuccess }) => {
                                    setTimeout(() => {
                                        if (onSuccess) {
                                            onSuccess("ok");
                                        }
                                    }, 0);
                                }}
                                onChange={(info) => handleFileChange(info, 'image')}
                            >
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Form.Item>
                        {formData.image_url && (
                            <img src={formData.image_url} alt="Selected" style={{ width: '100%', marginTop: '10px' }} />
                        )}
                    </>
                )}

                {formData.lesson_type === LessonTypeEnum.Text && (
                    <Form.Item label="Description">
                    <Input.TextArea
                        value={formData.description || ''} // Chuyển null thành chuỗi rỗng
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </Form.Item>
                )}

                <Form.Item label="Time">
                    <Input
                        type="number"
                        value={formData.full_time}
                        onChange={(e) => setFormData({ ...formData, full_time: Number(e.target.value) })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateDetailLesson;
// QUân