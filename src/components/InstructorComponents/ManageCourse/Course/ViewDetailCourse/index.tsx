import { useState, useEffect, useCallback, useRef } from 'react';
import { Descriptions, Image, Spin, Button } from 'antd';
import { GetCourseByIdResponse } from "../../../../../model/admin/response/Course.response";
import { CourseService } from '../../../../../services/CourseService/course.service';
import { useParams } from 'react-router-dom';
import UpdateDetailCourse from '../UpdateDetailCourse'; // Import modal Update
import { toast } from 'react-toastify';
const ViewDetailCourse = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<GetCourseByIdResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to show/hide modal
  const [isUpdated, setIsUpdated] = useState(false); // Flag to refresh data after update
  const hasMounted = useRef(false);

  const fetchCourseDetails = useCallback(
    async (courseId: string) => {
      try {
        setLoading(true);
        const response = await CourseService.getCourseById(courseId);
        const courseData = response.data?.data as GetCourseByIdResponse;

        if (courseData) {
          setCourse(courseData);
        } else {
          toast.error("No course data available.");
        }
      } catch{
        toast.error("Failed to fetch course details. Please try again.");
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
      fetchCourseDetails(id);
    }
  }, [id, fetchCourseDetails, isUpdated]); // Add isUpdated to refetch data after update

  const handleEditClick = () => {
    setIsModalVisible(true); // Show the modal when edit is clicked
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUpdateSuccess = () => {
    setIsUpdated(!isUpdated); // Refresh the course data after successful update
    setIsModalVisible(false); // Close modal after update
  };

  if (loading) return <Spin tip="Loading course details..." />;

  if (!course) return <div>Course not found</div>;

  return (
    <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Course Details</h2> {/* Tiêu đề */}
      <Button type="primary" onClick={handleEditClick}>
        Edit
      </Button> {/* Nút Edit */}
    </div>

    <Descriptions title={false} bordered column={1}>
      <Descriptions.Item label="Title">{course.name}</Descriptions.Item>
      <Descriptions.Item label="Status">{course.status}</Descriptions.Item>
      <Descriptions.Item label="Price">${course.price}</Descriptions.Item>
      <Descriptions.Item label="Discount">{course.discount}%</Descriptions.Item>
      <Descriptions.Item label="Video URL">
        <a href={course.video_url} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="Image">
        <Image src={course.image_url} alt={course.name} width={200} />
      </Descriptions.Item>
      <Descriptions.Item label="Description">{course.description}</Descriptions.Item>
      <Descriptions.Item label="Content">{course.content}</Descriptions.Item>
      <Descriptions.Item label="Created At">{new Date(course.created_at).toLocaleDateString()}</Descriptions.Item>
      <Descriptions.Item label="Updated At">{new Date(course.updated_at).toLocaleDateString()}</Descriptions.Item>
    </Descriptions>

    {/* Modal for update */}
    {isModalVisible && course && (
      <UpdateDetailCourse
        course={course}
        onClose={handleCloseModal}
        onUpdate={handleUpdateSuccess}
      />
    )}
  </div>
  );
};

export default ViewDetailCourse;
