import { useState, useEffect } from "react";
import { Table, Button, Spin, Modal, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { LessonService } from "../../../../../services/LessonService/LessionService";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const TableLesson = () => {
  const navigate = useNavigate();
  const [lessonsData, setLessonsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const response = await LessonService.getLessons();

        if (response.data?.success && response.data.data?.pageData) {
          // Gắn key từ _id để sử dụng cho dataSource của bảng
          const lessonsWithKey = response.data.data.pageData.map(
            (lesson: any) => ({
              ...lesson,
              key: lesson._id,
            })
          );
          setLessonsData(lessonsWithKey);
        } else {
          console.error(
            "Failed to fetch lessons: pageData not found",
            response
          );
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleViewDetails = (lessonId: string) => {
    navigate(`/instructor/${lessonId}`);
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      await LessonService.deleteLesson(lessonId);

      // Cập nhật state sau khi xóa
      setLessonsData((prevLessons) =>
        prevLessons.filter((lesson) => lesson._id !== lessonId)
      );

      message.success("Lesson deleted successfully!");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      message.error("Failed to delete lesson!");
    }
  };

  const showDeleteConfirm = (lessonId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this lesson?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteLesson(lessonId);
      },
    });
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
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            type="primary"
            onClick={() => handleViewDetails(record._id)}
          >
            View Details
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  if (loading) return <Spin tip="Loading course details..." />;

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
