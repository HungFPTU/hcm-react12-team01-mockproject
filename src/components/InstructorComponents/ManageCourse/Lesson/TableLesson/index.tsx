import { useState, useEffect, useRef, useCallback } from "react";
import { Table, Button, Popover, Modal, message, Input, Form, InputNumber, Select } from "antd";
import { LessonService } from "../../../../../services/LessonService/lesson.service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CreateLessonRequest, GetLessonRequest } from "../../../../../model/admin/request/Lesson.request";
import { GetLessonsResponsePageData } from "../../../../../model/admin/response/Lesson.response";
import UpdateDetailLesson from '../UpdateDetailLesson/index';
import { GetCourseRequest } from "../../../../../model/admin/request/Course.request";
import { CourseService } from "../../../../../services/CourseService/course.service";
import { SessionService } from "../../../../../services/SessionService/session.service";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";
import { Session } from "../../../../../model/admin/response/Session.response";
import { LessonTypeEnum } from "../../../../../model/Lesson";
import { Editor } from "@tinymce/tinymce-react";
const { Option } = Select;

const TableLesson = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>(
    []
  );
  const [sessionData, setSessionData] = useState<Session[]>([]);
  const [courseID, setCourseID] = useState<string | null>();
  const [filteredSessionData, setFilteredSessionData] = useState<Session[]>([]);
  const [lessonType, setLessonType] = useState<string>(""); // Theo dõi loại bài học
  const editorRef = useRef<any>(null); // Tham chiếu đến TinyMCE editor
  const hasMounted = useRef(false);
  const [lessonsData, setLessonsData] = useState<GetLessonsResponsePageData[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<GetLessonsResponsePageData[]>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<GetLessonsResponsePageData | null>(null);

  const fetchLesson = async (params: GetLessonRequest) => {
    try {
      const response = await LessonService.getLesson(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch lessons:", error);
    }
  };
  const showModal = () => {
    setIsAddModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
  };
  const handleSubmit = async (values: CreateLessonRequest) => {
    try {
      const description = editorRef.current
        ? editorRef.current.getContent()
        : ""; // Lấy nội dung từ editor



      // Tạo đối tượng bài học dựa vào loại bài học
      const newLesson: CreateLessonRequest = {
        name: values.name,
        course_id: values.course_id,
        session_id: values.session_id,
        lesson_type: values.lesson_type,
        description: description,
        video_url: values.video_url,
        image_url: values.image_url,
        full_time: values.full_time,
        position_order: values.position_order,
      };

      if (values.lesson_type === LessonTypeEnum.Video) {
        newLesson.video_url = values.video_url;
      } else {
        newLesson.image_url = values.image_url;
      }

      const response = await LessonService.createLesson(newLesson);
      if (response && response.data.success) {
        message.success("Bài học đã được tạo thành công!");
        setIsAddModalVisible(false);
        console.log("Lesson created successfully, fetching lessons...");
        await fetchLessonsData();
      } else {
        message.error("Có lỗi khi tạo bài học.");
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
      message.error("Không thể tạo bài học, vui lòng thử lại!");
    }
  };

  const handleChange = (courses_id: string) => {
    setCourseID(courses_id);
    setFilteredSessionData(
      sessionData.filter((session) => session.course_id === courses_id)
    );
  };

  const handleLessonTypeChange = (value: string) => {
    setLessonType(value);
  };
  const fetchCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch courses:", error);
    }
  };
  const fetchLessonsData = useCallback(async () => {
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
  }, [searchQuery, lessonsData]);
  const fetchCoursesData = async () => {
    try {
      const searchCondition = {
        keyword: searchQuery,
        category_id: "",
        status: undefined,
        is_delete: false,
      };

      const response = await fetchCourse({
        searchCondition,
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });

      if (response && response.success) {
        const data = response.data.pageData;
        setCoursesData(data);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;


    fetchLessonsData();
    fetchCoursesData();
  }, [searchQuery]);

  useEffect(() => {
    SessionService.getSessions({
      searchCondition: { keyword: '', is_position_order: false, is_delete: false },
      pageInfo: { pageNum: 1, pageSize: 10 },
    })
      .then((response) => {
        if (response && response.data && response.data.data) {
          setSessionData(response.data.data.pageData);
        }
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    console.log("Component mounted, fetching lessons...");
    fetchLessonsData();
  }, [fetchLessonsData]);

  const handleDeleteCourse = async (lessonId: string) => {
    try {
      const response = await LessonService.deleteLesson(lessonId);
      if (response && response.data.success) {
        setLessonsData((prevLessons) =>
          prevLessons.filter((lesson) => lesson._id !== lessonId)
        );
        message.success("Course deleted successfully!");
        await fetchLessonsData();

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

  const handleSearch = async () => {
    await fetchLessonsData();
  };


  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedLesson(null);
  };
  const handleEditCourse = (lesson: GetLessonsResponsePageData) => {
    setSelectedLesson(lesson); // Set the selected lesson
    setIsModalVisible(true);    // Show the modal for editing
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
      title: "Action",
      key: "action",
      render: (_: unknown, record: GetLessonsResponsePageData) => (
        <>
          <Popover content="Edit Course">
            <Button
              onClick={() => handleEditCourse(record)}
              className="bg-blue-500 hover:bg-blue-600 text-white mr-2"
            >
              <EditOutlined />
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
        <Button onClick={showModal} style={{ marginRight: "10px" }}>
          Create Lesson
        </Button>
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
      <Modal
        title="Create Lesson"
        open={isAddModalVisible}
        width={800}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              placeholder="Nhập tên bài học"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="course_id"
            label="Course"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn khóa học" onChange={handleChange}>
              {coursesData.map((courses) => (
                <Select.Option key={courses._id} value={courses._id}>
                  {courses.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="session_id"
            label="Session"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn session" disabled={!courseID}>
              {filteredSessionData.map((session) => (
                <Select.Option key={session._id} value={session._id}>
                  {session.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="lesson_type"
            label="Lesson Type"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Select style={{ width: "100%" }} onChange={handleLessonTypeChange}>
              <Option value="video">Video</Option>
              <Option value="text">Text</Option>
              <Option value="image">Image</Option>
            </Select>
          </Form.Item>

          {lessonType === "text" && (
            <Form.Item
              name="description"
              label="Description"
              labelCol={{ span: 24 }}
            >
              <Editor
                onInit={(_evt, editor) => (editorRef.current = editor)}
                apiKey="8pum9vec37gu7gir1pnpc24mtz2yl923s6xg7x1bv4rcwxpe"
                init={{
                  width: "100%",
                  height: 300,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "help",
                  ],
                  toolbar:
                    "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | link image | print preview media fullscreen | " +
                    "forecolor backcolor emoticons | help",
                  menubar: "file edit view insert format tools table help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                }}
              />
            </Form.Item>
          )}

          {lessonType === "video" && (
            <Form.Item
              name="video_url"
              label="Video URL"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Vui lòng nhập URL của video" },
              ]}
            >
              <Input placeholder="Nhập URL video" style={{ width: "100%" }} />
            </Form.Item>
          )}

          {lessonType === "image" && (
            <Form.Item
              name="image_url"
              label="Image URL"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Vui lòng nhập URL của hình ảnh" },
              ]}
            >
              <Input
                placeholder="Nhập URL hình ảnh"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}

          <Form.Item name="full_time" label="Full Time" labelCol={{ span: 24 }}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="position_order"
            label="Position Order"
            labelCol={{ span: 24 }}
            initialValue={1} // Giá trị mặc định là 1 nếu không nhập
            rules={[
              {
                type: "number",
                min: 0,
                message: "Position order must be a non-negative number",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Lesson
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Update Detail Lesson */}
      {isModalVisible && selectedLesson && (
        <UpdateDetailLesson
          lesson={selectedLesson}
          onClose={handleModalClose}
          onUpdate={() => {
            fetchLessonsData();
            handleModalClose();
          }}
        />
      )}
    </div>
  );
};

export default TableLesson;
