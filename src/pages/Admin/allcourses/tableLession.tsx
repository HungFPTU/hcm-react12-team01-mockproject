import { useState, useEffect, useCallback } from "react";
import { Table } from "antd";
import { LessonService } from "../../../services/LessonService/lesson.service";
import { Lesson } from "../../../model/admin/response/Lesson.response";

const TableLesson = () => {
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
      title: "User Name",
      dataIndex: "user_name",
      key: "name",
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
