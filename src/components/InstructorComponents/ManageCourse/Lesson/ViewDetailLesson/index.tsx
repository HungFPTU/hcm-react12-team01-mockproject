import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Image, Button } from 'antd';
import { LessonService } from "../../../../../services/LessonService/lesson.service";
import { LessonDetailsResponse } from "../../../../../model/admin/response/Lesson.response";
import UpdateDetailLesson from '../UpdateDetailLesson'; // Import modal Update
import { toast } from 'react-toastify';
const ViewDetailLesson = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonDetailsResponse | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [isUpdated, setIsUpdated] = useState(false); // Flag to refresh data after update
  const hasMounted = useRef(false);

  const fetchLessonDetails = useCallback(
    async (lessonId: string) => {
      try {
        const response = await LessonService.getLessonDetails(lessonId);
        const lessonData = response.data?.data as LessonDetailsResponse;
        if (lessonData) {
          setLesson(lessonData);
        } else {
          toast.error("No lesson data available."); // Thay vì message.error
        }
      } catch (error:any) {
        toast.error("No lesson data available.",error); // Thay vì message.error
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
  }, [id, fetchLessonDetails, isUpdated]);

  const handleEditClick = () => {
    setIsModalVisible(true); // Show the modal when edit is clicked
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUpdateSuccess = () => {
    setIsUpdated(!isUpdated); // Refresh the lesson data after successful update
    setIsModalVisible(false); // Close modal after update
  };



  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lesson Details</h2> {/* Tiêu đề */}
        <Button type="primary" onClick={handleEditClick}>
          Edit
        </Button> {/* Nút Edit */}
      </div>

      <Descriptions title={false} bordered column={1}>
        <Descriptions.Item label="Name">{lesson.name}</Descriptions.Item>
        <Descriptions.Item label="Course Name">{lesson.course_id}</Descriptions.Item>
        <Descriptions.Item label="Session Name">{lesson.session_id}</Descriptions.Item>
        <Descriptions.Item label="Lession Type">{lesson.lesson_type}</Descriptions.Item>
        <Descriptions.Item label="Video URL">
          {lesson.video_url && (
            <a href={lesson.video_url} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Image">
          {lesson.image_url && <Image src={lesson.image_url} alt={lesson.name} width={200} />}
        </Descriptions.Item>
        <Descriptions.Item label="Description">{lesson.description}</Descriptions.Item>
        <Descriptions.Item label="Time">{lesson.full_time}</Descriptions.Item>
        <Descriptions.Item label="Created At">{new Date(lesson.created_at).toLocaleDateString()}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{new Date(lesson.updated_at).toLocaleDateString()}</Descriptions.Item>
      </Descriptions>

      {/* Modal for update */}
      {isModalVisible && lesson && (
        <UpdateDetailLesson
          lesson={lesson}
          onClose={handleCloseModal}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ViewDetailLesson;
