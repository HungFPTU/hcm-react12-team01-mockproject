import { useState, useEffect, useCallback } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LessonService } from "../../../../../services/LessonService/lesson.service";
import { Lesson } from "../../../../../model/admin/response/Lesson.response";
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
          pageInfo: { pageNum: 1, pageSize: 100},
        });
        if (response.data) {
          const lessons = Array.isArray(response.data.data.pageData) ? response.data.data.pageData :[response.data.data.pageData];
          setLessonsData(lessons);
        }
  }, []);

    useEffect(() => {
      fetchLesson();
    },[fetchLesson])

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
        <Button type="primary" onClick={() => handleViewDetails(record._id)}>
          View Details
        </Button>
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
