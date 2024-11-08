import { useState, useEffect,useRef,useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, message,Spin, Image } from 'antd';
import { LessonService } from "../../../../../services/LessonService/lesson.service";
import { LessonDetailsResponse } from "../../../../../model/admin/response/Lesson.response";


const ViewDetailLesson = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasMounted = useRef(false);

  const fetchLessonDetails = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const response = await LessonService.getLessonDetails(id);
        const lessonData = response.data?.data as LessonDetailsResponse;

        if (lessonData) {
          setLesson(lessonData);
        } else {
          message.error("No lesson data available.");
        }
      } catch (error) {
        message.error("Failed to fetch lesson details. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    if (id) {
      fetchLessonDetails(id);
    }
  }, [id, fetchLessonDetails]);

  if (loading) return <Spin tip="Loading lesson details..." />;

  if (!lesson) return <div>Course not found</div>;


  if (!lesson) return <div>Lesson not found</div>;

  return (
    <Descriptions title="Course Details" bordered column={1}>
    <Descriptions.Item label="Name">{lesson.name}</Descriptions.Item>
    <Descriptions.Item label="Course Name">{lesson.course_name}</Descriptions.Item>
    <Descriptions.Item label="Session Name">{lesson.session_name}</Descriptions.Item>
    <Descriptions.Item label="Type">{lesson.lesson_type}</Descriptions.Item>
    <Descriptions.Item label="Video URL">
      <a href={lesson.video_url} target="_blank" rel="noopener noreferrer">
        Watch Video
      </a>
    </Descriptions.Item>
    <Descriptions.Item label="Image">
      <Image src={lesson.image_url} alt={lesson.name} width={200} />
    </Descriptions.Item>
    <Descriptions.Item label="Description">{lesson.description}</Descriptions.Item>
    <Descriptions.Item label="Time">{lesson.full_time}</Descriptions.Item>
    <Descriptions.Item label="Created At">{new Date(lesson.created_at).toLocaleDateString()}</Descriptions.Item>
    <Descriptions.Item label="Updated At">{new Date(lesson.updated_at).toLocaleDateString()}</Descriptions.Item>
  </Descriptions>
  );
};

export default ViewDetailLesson;
