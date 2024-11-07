import { useState, useEffect, useCallback,useRef } from 'react';
import { Descriptions, message, Image } from 'antd';
import { GetCourseByIdResponse } from "../../../../../model/admin/response/Course.response";
import { CourseService } from '../../../../../services/CourseService/course.service';
interface ViewDetailCourseProps {
  courseId: string;
}

const ViewDetailCourse: React.FC<ViewDetailCourseProps> = ({ courseId }) => {
  const [course, setCourse] = useState<GetCourseByIdResponse | null>(null);
  const hasMounted = useRef(false);
  const fetchCourseDetails = useCallback(
    async (courseId: string) => {
      try {
        const response = await CourseService.getCourseById(courseId);
        const courseData = response.data?.data as GetCourseByIdResponse;

        if (courseData) {
          setCourse(courseData);
        } else {
          message.error("No course data available.");
        }
      } catch (error) {
        message.error("Failed to fetch course details. Please try again.");
      }
    },
    []
  );

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchCourseDetails(courseId);
  }, [courseId, fetchCourseDetails]);

  if (!course) return <div>Course not found</div>;

  return (
    <Descriptions title="Course Details" bordered column={1}>
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
      <Descriptions.Item label="Content">
        {course.content}
      </Descriptions.Item>
      <Descriptions.Item label="Created At">{new Date(course.created_at).toLocaleDateString()}</Descriptions.Item>
      <Descriptions.Item label="Updated At">{new Date(course.updated_at).toLocaleDateString()}</Descriptions.Item>
    </Descriptions>
  );
};

export default ViewDetailCourse;
