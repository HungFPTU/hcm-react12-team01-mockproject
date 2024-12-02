import React, { useEffect, useState, useRef } from 'react';
import { Modal, Input, Form, Button, Select, Spin } from 'antd';
import { LessonService } from '../../../../../services/LessonService/lesson.service';
import { CourseService } from '../../../../../services/CourseService/course.service';
import { LessonDetailsResponse } from '../../../../../model/admin/response/Lesson.response';
import { UpdateLessonRequest } from '../../../../../model/admin/request/Lesson.request';
import { LessonTypeEnum } from '../../../../../model/Lesson';
import { Editor } from "@tinymce/tinymce-react";
import { toast } from 'react-toastify';
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
    const [form] = Form.useForm();
    const hasMounted = useRef(false);
    const editorRef = useRef<any>(null); // Tham chiếu đến TinyMCE editor

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
                toast.success(courses)
            }
        } catch (error: any) {
            toast.error("Failed to fetch courses:", error);
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
        if (!formData.name || !formData.course_id || !formData.lesson_type || !formData.full_time) {

            return;
        }
        const description = editorRef.current ? editorRef.current.getContent() : "";
        if (!formData.session_id) {
            console.log("Form Data before Save:", formData);
            toast.error("Session ID is required.");
            return;
        }

        const lessonId = lesson._id;
        try {
            const updateData: UpdateLessonRequest = {
                name: formData.name,
                course_id: formData.course_id,
                session_id: formData.session_id,
                user_id: formData.user_id,
                lesson_type: formData.lesson_type as LessonTypeEnum,
                description: description,
                video_url: formData.video_url || "",
                image_url: formData.image_url || "",
                full_time: formData.full_time,
                position_order: formData.position_order || 0,
            };

            const response = await LessonService.updateLesson(lessonId, updateData);

            if (response?.data?.success) {
                toast.success("Lesson updated successfully!");
                onUpdate();
                onClose();
            } else if (response?.data?.data && Array.isArray(response.data.data)) {
                response.data.data.forEach((err: { message: string, field: string }) => {
                    if (err.field === "course_id") {
                        toast.error("The selected course cannot be used!");
                    }
                    if (err.field === "session_id") {
                        toast.error("The selected session cannot be used!");
                    }
                    if (err.field === "video_url") {
                        toast.error("Video URL must be a valid string!");
                    }
                    if (err.field === "image_url") {
                        toast.error("Image URL must be a valid string!");
                    }
                });
            }
        } catch (error: any) {
            toast.error("Failed to update lesson. Please try again.",error);
        }
    };

    const extractYouTubeID = (url: string) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    if (loading) {
        return <Spin tip="Loading..." />;
    }

    return (
        <Modal
            title="Update Lesson Details"
            visible={true}
            onCancel={onClose}
            width={800}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" initialValues={formData}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the lesson name!' }]}
                >
                    <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Form.Item>

                <Form.Item
                    label="Lesson Type"
                    name="lesson_type"
                    rules={[{ required: true, message: 'Please select a lesson type!' }]}
                >
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
                        <Form.Item
                            label="Video URL"
                            name="video_url"
                            rules={[{ required: true, message: 'Please enter the Video URL!' }]}
                        >
                            <Input
                                value={formData.video_url || ""}
                                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                placeholder="Enter video URL"
                            />
                        </Form.Item>
                        {formData.video_url && (
                            formData.video_url.includes('youtube.com') || formData.video_url.includes('youtu.be') ? (
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${extractYouTubeID(formData.video_url)}`}
                                    title="YouTube video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ marginTop: '10px' }}
                                ></iframe>
                            ) : (
                                <video src={formData.video_url} controls style={{ width: '100%', marginTop: '10px' }} />
                            )
                        )}
                    </>
                )}
                {formData.lesson_type === LessonTypeEnum.Image && (
                    <>
                        <Form.Item
                            label="Image URL"
                            name="image_url"
                            rules={[{ required: true, message: 'Please input the lesson Image URL!' }]}
                        >
                            <Input
                                value={formData.image_url || ""}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="Enter image URL"
                            />
                        </Form.Item>
                        {formData.image_url && (
                            <img src={formData.image_url} alt="Selected" style={{ width: '100%', marginTop: '10px' }} />
                        )}
                    </>
                )}

                {formData.lesson_type === LessonTypeEnum.Text && (
                    <Form.Item
                        label="Description"
                        name="description"

                    >
                        {/* <Input.TextArea
                            value={formData.description || ""}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        /> */}
                        <Editor
                            onInit={(_evt, editor) => (editorRef.current = editor)}
                            apiKey="8pum9vec37gu7gir1pnpc24mtz2yl923s6xg7x1bv4rcwxpe"
                            value={formData.description || ''}
                            onEditorChange={(content) => setFormData({ ...formData, description: content })}

                            init={{
                                width: "100%",
                                height: 300,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "link",
                                    "image",
                                    "lists",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "pagebreak",
                                    "searchreplace",
                                    "wordcount",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "emoticons",
                                    "help",
                                ],
                                toolbar:
                                    "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                                    "bullist numlist outdent indent | link image | print preview media fullscreen | " +
                                    "forecolor backcolor emoticons | help",
                                menubar: "file edit view insert format tools table help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                            }}
                        />
                    </Form.Item>
                )}

                <Form.Item
                    label="Time"
                    name="full_time"
                    rules={[{ required: true, message: 'Please input the lesson time!' }]}
                >
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
