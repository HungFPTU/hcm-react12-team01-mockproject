import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  PlayCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Button, Card, Row, Col, Typography, Breadcrumb, Menu, Divider } from "antd";
import { LessonService } from "../../services/LessonService/lesson.service";
import { GetPublicCourseDetailResponse } from "../../model/admin/response/Course.response";
import { LessonDetailsResponse } from "../../model/admin/response/Lesson.response";
import { CourseService } from "../../services/CourseService/course.service";

const { Title, Text } = Typography;
const isValidObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

const LessonDetail: React.FC = () => {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [lesson, setLesson] = useState<LessonDetailsResponse | null>(null);
  const [course, setCourse] = useState<GetPublicCourseDetailResponse | null>(null);

  if (!lessonId || !isValidObjectId(lessonId)) {
    return <div className="mt-8 text-center text-2xl">Invalid lesson ID</div>;
  }

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        const response = await LessonService.getLessonDetails(lessonId);
        setLesson(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load lesson details.");
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLessonDetails();
    }
  }, [lessonId]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await CourseService.getPublicCourseDetail(courseId || "");
        const courseData = response.data.data;

        setCourse(courseData);

        if (!courseData.is_purchased) {
          alert("You must purchase this course to access lessons.");
          navigate(`/course/${courseId}`);
        }
      } catch (err) {
        setError("Failed to load course details.");
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId, lessonId]);

  if (loading) {
    return <div className="mt-8 text-center text-2xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mt-8 text-center">
        <div className="mb-4 text-2xl">{error}</div>
        <Button onClick={() => navigate(`/course/${courseId}`)}>Back to Course</Button>
      </div>
    );
  }

  const toggleMenu = () => {
    setMenuCollapsed(!menuCollapsed);
  };

  const renderLessonMenu = (sessions: any[] | undefined) => {
    if (!sessions) return null;

    return (
      <Menu
        mode="inline"
        className="w-full border-none"
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "0px",
          background: "#f9f9f9",
        }}
      >
        {sessions.map((session) => (
          <Menu.SubMenu
            key={session._id}
            title={<Text strong>{session.name}</Text>}
          >
            {session.lesson_list
              .sort((a: any, b: any) => a.position_order - b.position_order)
              .map((lesson: any) => (
                <Menu.Item key={lesson._id}>
                  <Link
                    to={`/course/${course?._id}/lesson/${lesson._id}`}
                    className="flex items-center text-gray-700 hover:text-[#1a237e]"
                  >
                    <PlayCircleOutlined className="mr-2" />
                    {lesson.name}
                  </Link>
                </Menu.Item>
              ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    );
  };

  const breadcrumbItems = [
    { title: <Link to="/">Home</Link> },
    { title: <Link to={`/course/${course?._id}`}>{course?.name}</Link> },
    { title: lesson?.name },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 mt-9">
      <div className="container mx-auto px-6">
        <div className="mb-6 flex items-center">
          <Button
            icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleMenu}
            type="text"
            className="mr-4"
          />
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <Row gutter={[24, 24]}>
          {!menuCollapsed && (
            <Col xs={24} lg={8}>
              <Card>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Course Content
                </Title>
                {renderLessonMenu(course?.session_list)}
              </Card>
            </Col>
          )}
          <Col xs={24} lg={menuCollapsed ? 24 : 16}>
            <Card>
              <Title level={2}>{lesson?.name}</Title>
              <Divider />
              <div className="relative aspect-video mb-6 flex items-center justify-center rounded-md">
                {lesson?.video_url ? (
                  lesson.video_url.includes("youtube.com") || lesson.video_url.includes("youtu.be") ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(lesson.video_url).search).get("v")}`}
                      title={lesson.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg shadow-2xl"
                    />
                  ) : (
                    <video controls className="h-full w-full">
                      <source src={lesson.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : lesson?.image_url ? (
                  <img
                    src={lesson.image_url}
                    alt={lesson.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LessonDetail;
