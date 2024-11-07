import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SessionService } from "../../../../../services/SessionService/SessionService";

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

  const handleViewDetails = (sessionId: string) => {
    navigate(`/instructor/${sessionId}`);
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
        <Button type="primary" onClick={() => handleViewDetails(record._id)}>
          View Details
        </Button>
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
