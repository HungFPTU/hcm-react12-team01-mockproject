import { useState, useEffect, useRef } from "react";
import { Table, Button, Popover, Modal, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { SessionService } from "../../../../../services/SessionService/session.service";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const TableSession = () => {
  const navigate = useNavigate();
  const [sessionsData, setSessionsData] = useState<any[]>([]);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    const fetchSessions = async () => {
      try {

        const response = await SessionService.getSessions();

        if (response.data?.success && response.data.data?.pageData) {
          const sessionsWithKey = response.data.data.pageData.map(
            (session: any) => ({
              ...session,
              key: session._id,
            })
          );
          setSessionsData(sessionsWithKey);
        } else {
          console.error(
            "Failed to fetch sessions: pageData not found",
            response
          );
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

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
      title: "Position Order",
      dataIndex: "position_order",
      key: "position_order",
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
      render: (_: unknown, record: any) => (
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
    <Table
      dataSource={sessionsData}
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
  );
};

export default TableSession;
