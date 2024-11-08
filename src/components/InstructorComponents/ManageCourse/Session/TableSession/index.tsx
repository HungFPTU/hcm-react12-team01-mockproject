import { useState, useEffect } from "react";
import { Table, Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { SessionService } from "../../../../../services/SessionService/SessionService";
import { EyeOutlined } from "@ant-design/icons";

const TableSession = () => {
  const navigate = useNavigate();
  const [sessionsData, setSessionsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await SessionService.getSessons();

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
        <Popover content="View Session Detail">
          <Button
            onClick={() => handleViewDetails(record._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <EyeOutlined />
          </Button>
        </Popover>
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
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
  );
};

export default TableSession;
