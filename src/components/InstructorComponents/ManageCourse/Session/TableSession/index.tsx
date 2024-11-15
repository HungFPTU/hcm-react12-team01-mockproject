import { useState, useEffect, useRef } from "react";
import { Table, Button, Popover, Modal, message, Space, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SessionService } from "../../../../../services/SessionService/session.service";
import { EyeOutlined, DeleteOutlined} from "@ant-design/icons";
import { GetSessionResponsePageData } from "../../../../../model/admin/response/Session.response"
import { GetSessionRequest } from "../../../../../model/admin/request/Session.request";
import ButtonSession from "../ButtonSession";

const TableSession = () => {
  const navigate = useNavigate();
  const [sessionsData, setSessionsData] = useState<GetSessionResponsePageData[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<GetSessionResponsePageData[]>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const hasMounted = useRef(false);

  const fetchSession = async (params: GetSessionRequest) => {
    try {
      const response = await SessionService.getSessions(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch sessions:", error);
    }
  };

  const fetchSessionsData = async () => {
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
        setFilteredSessions(data);
        setIsDataEmpty(data.length === 0);
      } else {
        message.error("Không tìm thấy khóa học nào.");
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    }
  };

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

  const handleViewDetails = (id: string) => {
    navigate(`/instructor/manage-course/view-detail-session/${id}`);
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await SessionService.deleteSession(sessionId);
      setSessionsData((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionId)
      );

      message.success("Session deleted successfully!");
    } catch (error) {
      console.error("Error deleting session:", error);
      message.error("Failed to delete session!");
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

  const handleSearch = () => {
    fetchSessionsData();
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
      title: "Lesson",
      dataIndex: "lesson_count",
      key: "lesson_count",
      render: (lesson_count: number) => (lesson_count ? lesson_count : "-"),
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
          <Popover content="View Session Detail">
            <Button
              onClick={() => handleViewDetails(record._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <EyeOutlined />
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
          style={{ width: '20%' }}
        />
        <ButtonSession />
      </div>
      <div>
      {isDataEmpty ? (
          <div className="text-center text-red-500">No sessions found.</div>
      ) : (
      <Table
        dataSource={filteredSessions}
        columns={columns}
        rowKey= "_id"
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

export default TableSession;
