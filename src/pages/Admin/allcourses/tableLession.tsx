import { useState, useEffect, useRef } from "react";
import { Input, Table } from "antd";
import { LessonService } from "../../../services/LessonService/lesson.service";
import { GetLessonsResponsePageData } from "../../../model/admin/response/Lesson.response";
import { GetLessonRequest } from "../../../model/admin/request/Lesson.request";
import { toast } from "react-toastify";

const TableLesson = () => {
  const [filteredLessons, setFilteredLessons] = useState<GetLessonsResponsePageData[]>([]);
  const hasMounted = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchLesson = async (params: GetLessonRequest) => {
    try {
      const response = await LessonService.getLesson(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch lessons:", error);
    }
  };
  const fetchLessonsData = async () => {
    try {
      const searchCondition = {
        keyword: searchQuery.trim(),
        is_position_order: false,
        is_deleted: false,
      };
      const response = await fetchLesson({
        searchCondition: {
          ...searchCondition,
          _id: "",
          course_id: "",
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 1000,
        },
      });
      if (response && response.success) {
        const data: GetLessonsResponsePageData[] = response.data.pageData;
        setFilteredLessons(data);
      } else {
        toast.error("Can't find lessons.");
      }
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
    }
  };

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchLessonsData();
  }, []);

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
  const handleSearch = async () => {
    await fetchLessonsData();
  };
  return (
    <div className="w-full">
      <div className="flex mb-4 justify-between items-center">
        <Input.Search
          placeholder="Search lessons..."
          value={searchQuery}
          onPressEnter={handleSearch}
          onSearch={handleSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
          enterButton
          style={{ width: '20%' }}
        />

      </div>
      <Table
        dataSource={filteredLessons}
        columns={columns}
        rowKey="key"
        className="w-full shadow-md rounded-lg overflow-hidden"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

    </div>
  );
};

export default TableLesson;
