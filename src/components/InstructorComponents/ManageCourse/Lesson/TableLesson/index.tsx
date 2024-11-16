import { useState, useEffect, useRef } from "react";
import { Table, Button, Popover, Modal, message, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { LessonService } from "../../../../../services/LessonService/lesson.service";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { GetLessonRequest } from "../../../../../model/admin/request/Lesson.request";
import { GetLessonsResponsePageData } from "../../../../../model/admin/response/Lesson.response";
import ButtonLesson from "../ButtonLesson";

const TableLesson = () => {
  const navigate = useNavigate();
  const [lessonsData, setLessonsData] = useState<GetLessonsResponsePageData[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<GetLessonsResponsePageData[]>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const hasMounted = useRef(false);

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
        setLessonsData(data);
        setFilteredLessons(data);
        setIsDataEmpty(data.length === 0);
      } else {
        message.error("Không tìm thấy khóa học nào.");
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

  useEffect(() => {
    if (lessonsData.length > 0) {
      console.log("Có khóa học trong lessonsData:", lessonsData);
    }
  }, [lessonsData]);

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

  const handleSearch = () => {
    fetchLessonsData();
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
      title: "Lesson Type",
      dataIndex: "lesson_type",
      key: "lesson_type",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: GetLessonsResponsePageData) => (
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
        <ButtonLesson />
      </div>
      <div>
      {isDataEmpty ? (
        <div className="text-center text-red-500">No lessons found.</div>
      ) : (
        <Table
      dataSource={filteredLessons}
      columns={columns}
      rowKey="key"
      className="w-full shadow-md rounded-lg overflow-hidden"
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["15", "20"],
        position: ["bottomRight"],
      }}
      />
      )}
    </div>
    </div>
  );
};

export default TableLesson;
