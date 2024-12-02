import { useState, useEffect, useRef, useCallback } from "react";
import {
  Table,
  Button,
  Popover,
  Modal,
  Space,
  Input,
  Form,
  Select,
  Spin,
} from "antd";
import { SessionService } from "../../../../../services/SessionService/session.service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GetSessionResponsePageData } from "../../../../../model/admin/response/Session.response";
import {
  CreateSessionRequest,
  GetSessionRequest,
} from "../../../../../model/admin/request/Session.request";
import { CourseService } from "../../../../../services/CourseService/course.service";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";
import { GetCourseRequest } from "../../../../../model/admin/request/Course.request";
import { toast } from "react-toastify";
const { Option } = Select;
const TableSession = () => {
  const [sessionsData, setSessionsData] = useState<
    GetSessionResponsePageData[]
  >([]);

  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSession, setEditingSession] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const hasMounted = useRef(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>(
    []
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const handleSubmit = async (values: any) => {
    try {
      const positionOrder = values.positionOrder
        ? Number(values.positionOrder)
        : 1;
      const description = values.description || "";
      const { sessionName: name, course_id } = values;

      // Create an object that matches CreateSessionRequest
      const params: CreateSessionRequest = {
        name,
        course_id,
        description,
        positionOrder,
      };

      // Call the createSession method with the params object
      const response = await SessionService.createSession(params);

      if (response && response.data.success) {
        toast.success("Session created successfully!");
        setIsModalVisible(false);
        await fetchSessions();
      }
    } catch {
      toast.error("Can't create session");
    }
  };
  const fetchSessionCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch {
      toast.error("Fail to fetch courses:");
    }
  };

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);

      const params: GetSessionRequest = {
        searchCondition: {
          keyword: "",
          is_position_order: false,
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      };
      const response = await SessionService.getSessions(params);
      if (response.data?.success && response.data.data?.pageData) {
        const sessionsWithKey = response.data.data.pageData.map(
          (session: GetSessionResponsePageData) => ({
            ...session,
            key: session._id,
          })
        );
        setSessionsData(sessionsWithKey);
      } else {
        toast.error("Failed to fetch sessions: pageData not found", response);
      }
    } catch {
      toast.error("Error fetching sessions:");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    const fetchCoursesData = async () => {
      try {
        const searchCondition = {
          keyword: searchQuery,
          category_id: "",
          status: undefined,
          is_delete: false,
        };

        const response = await fetchSessionCourse({
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
      } catch {
        toast.error("Failed to fetch courses:");
      }
    };

    fetchCoursesData();

    const fetchCourses = async () => {
      try {
        const response = await CourseService.getCourse({
          searchCondition: {
            keyword: "",
            category_id: "",
            status: undefined,
            is_delete: false,
          },
          pageInfo: { pageNum: 1, pageSize: 10 },
        });
        if (response.data?.success && response.data.data?.pageData) {
          setCourses(response.data.data.pageData);
        } else {
          toast.error("Failed to fetch courses:", response);
        }
      } catch {
        toast.error("Error fetching courses:");
      }
    };

    fetchSessions();
    fetchCourses();
  }, []);

  const fetchSession = async (params: GetSessionRequest) => {
    try {
      const response = await SessionService.getSessions(params);
      return response.data;
    } catch {
      toast.error("Fail to fetch sessions:");
    }
  };

  const fetchSessionsData = useCallback(async () => {
    try {
      const searchCondition = {
        keyword: searchQuery.trim(),
        is_position_order: false,
        is_delete: false,
      };

      const response = await fetchSession({
        searchCondition,
        pageInfo: {
          pageNum: 1,
          pageSize: 1000,
        },
      });

      if (response && response.success) {
        const data: GetSessionResponsePageData[] = response.data.pageData;
        setSessionsData(data);
        setSessionsData(data);
        setIsDataEmpty(data.length === 0);
      } else {
        toast.error("Can't find session");
      }
    } catch {
      toast.error("Failed to fetch sessions:");
    }
  }, [searchQuery]);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchSessionsData();
  }, []);

  useEffect(() => {
    if (sessionsData.length > 0) {
      console.log("Có khóa học trong sessionsData:", sessionsData);
    }
  }, [sessionsData]);

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await SessionService.deleteSession(sessionId);
      setSessionsData((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionId)
      );
      await fetchSessions();
      toast.success("Session deleted successfully!");
    } catch {
      toast.error("Failed to delete session!");
    }
  };

  const showDeleteConfirm = (sessionId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this session?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteSession(sessionId);
      },
    });
  };

  const handleSearch = async () => {
    await fetchSessionsData();
  };

  const showEditModal = (session: any) => {
    setEditingSession(session);
    setIsEditModalVisible(true);
    form.setFieldsValue({
      name: session.name,
      course_id: session.course_id,
      description: session.description,
      position_order: session.position_order,
    });
  };

  const handleUpdateSession = async () => {
    try {
      const updatedSession = form.getFieldsValue();

      if (
        updatedSession.position_order &&
        isNaN(updatedSession.position_order)
      ) {
        toast.error("Position order must be a number.");
        return;
      }

      updatedSession.position_order = Number(updatedSession.position_order);

      if (
        !updatedSession.name ||
        !updatedSession.course_id ||
        !updatedSession.description ||
        !updatedSession.position_order
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const response = await SessionService.updateSession(
        updatedSession,
        editingSession._id
      );

      if (response.data?.success) {
        const updatedCourse = courses.find(
          (course) => course._id === updatedSession.course_id
        );
        const updatedSessionWithCourseName = {
          ...updatedSession,
          course_name: updatedCourse ? updatedCourse.name : "",
        };

        setSessionsData((prevSessions) =>
          prevSessions.map((session) =>
            session._id === editingSession._id
              ? { ...session, ...updatedSessionWithCourseName }
              : session
          )
        );
        toast.success("Session updated successfully!");
        setIsEditModalVisible(false);
        setEditingSession(null);
        await fetchSessions();
      } else {
        toast.error("Failed to update session!");
      }
    } catch {
      toast.error("Failed to update session!");
    }
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
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: GetSessionResponsePageData) => (
        <Space size="middle">
          <Popover content="Edit Session">
            <Button
              onClick={() => showEditModal(record)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <EditOutlined />
            </Button>
          </Popover>
          <Popover content="Delete Session">
            <Button
              onClick={() => showDeleteConfirm(record._id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <DeleteOutlined />
            </Button>
          </Popover>
        </Space>
      ),
    },
  ];
  if (loading) return <Spin tip="Loading course details..." />;

  return (
    <div className="w-full">
      <div className="flex mb-4 justify-between items-center">
        <Input.Search
          placeholder="Search sessions..."
          value={searchQuery}
          onPressEnter={handleSearch}
          onSearch={handleSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
          enterButton
          style={{ width: "20%" }}
        />
        <Button onClick={showModal} style={{ marginRight: "10px" }}>
          Create Session
        </Button>
      </div>
      <Modal
        title="Create Session"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="sessionName"
            label="Session Name"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Vui lòng nhập tên session" }]}
          >
            <Input placeholder="Nhập tên session" />
          </Form.Item>

          <Form.Item
            name="course_id"
            label="Course "
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Vui lòng chọn khóa học" }]}
          >
            <Select placeholder="Chọn khóa học">
              {coursesData.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            labelCol={{ span: 24 }}
          >
            <Input.TextArea
              placeholder="Nhập mô tả"
              style={{ width: "100%", height: "100px" }}
            />
          </Form.Item>

          <Form.Item
            name="positionOrder"
            label="Position Order"
            labelCol={{ span: 24 }}
          >
            <Input type="number" placeholder="Nhập thứ tự vị trí " />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Session
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div>
        {isDataEmpty ? (
          <div className="text-center text-red-500">No sessions found.</div>
        ) : (
          <Table
            dataSource={sessionsData}
            columns={columns}
            rowKey="_id"
            className="w-full shadow-md rounded-lg overflow-hidden"
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["15", "20"],
              position: ["bottomRight"],
            }}
          />
        )}

        <Modal
          title="Edit Session"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onOk={handleUpdateSession}
          okText="Save"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Session Name"
              rules={[
                { required: true, message: "Please input session name!" },
              ]}
            >
              <Input placeholder="Session Name" />
            </Form.Item>

            <Form.Item
              name="course_id"
              label="Course"
              rules={[{ required: true, message: "Please select a course!" }]}
            >
              <Select placeholder="Select a course">
                {courses.map((course) => (
                  <Select.Option key={course._id} value={course._id}>
                    {course.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input placeholder="Description" />
            </Form.Item>

            <Form.Item
              name="position_order"
              label="Position Order"
              rules={[
                { required: true, message: "Please input position order!" },
              ]}
            >
              <Input type="number" placeholder="Position Order" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TableSession;
