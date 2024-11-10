import { useState, useEffect, useCallback } from "react";
import { Table, Button, Popover, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LessonService } from "../../../../../services/LessonService/lesson.service";
import { Lesson } from "../../../../../model/admin/response/Lesson.response";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const TableLesson = () => {
  const navigate = useNavigate();
  const [lessonsData, setLessonsData] = useState<Lesson["pageData"]>([]);



  const fetchLesson = useCallback(async () => {
    const response = await LessonService.getLesson({
      searchCondition: {
        keyword: "",
        course_id: "",
        is_delete: false,
        is_position_order: false,
      },
      pageInfo: { pageNum: 1, pageSize: 100 },
    });
    if (response.data) {
      const lessons = Array.isArray(response.data.data.pageData) ? response.data.data.pageData : [response.data.data.pageData];
      setLessonsData(lessons);
    }
  }, []);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson])


  const handleDeleteCourse = async (lessonId: string) => {
    try {
      const response = await LessonService.deleteLesson(lessonId);
      if (response && response.data.success) {
        setLessonsData((prevLessons) =>
          prevLessons.filter((lesson) => lesson._id !== lessonId)
        );
        message.success("Course deleted successfully!");
      }
    } catch (error) {
      message.error("Failed to delete course!");
      console.error("Error deleting course:", error);
    }
  };
  const showDeleteConfirm = (courseId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this course?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteCourse(courseId);
      },
    });
  };

  const handleViewDetails = (id: string) => {
    navigate(`/instructor/manage-course/view-detail-lesson/${id}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Lesson Type",
      dataIndex: "lesson_type",
      key: "lesson_type",
    },
    {
      title: "Full Time",
      dataIndex: "full_time",
      key: "full_time",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
    {
      title: "Media",
      dataIndex: "video_url",
      key: "video_url",
      render: (video_url: string) =>
        video_url ? (
          <video width="200" controls style={{ borderRadius: "7px" }}>
            <source src={video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          "No video available"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Lesson["pageData"][0]) => (
        <>
          <Popover content="View Course Detail">
            <Button
              onClick={() => handleViewDetails(record._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <EyeOutlined />
            </Button>
          </Popover>
          <Popover content="Delete Course">
            <Button
              onClick={() => showDeleteConfirm(record._id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <DeleteOutlined />
            </Button>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={lessonsData}
      columns={columns}
      rowKey="key"
      className="w-full shadow-md rounded-lg overflow-hidden"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
  );
};

export default TableLesson;
