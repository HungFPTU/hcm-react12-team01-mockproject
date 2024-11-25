import { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import { SessionService } from "../../../services/SessionService/session.service";

const TableSession = () => {
  const [sessionsData, setSessionsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);

        const response = await SessionService.getSessions({
          searchCondition: {
            keyword: "",
            is_position_order: false,
            is_delete: false,
          },
          pageInfo: { pageNum: 1, pageSize: 10000 },
        });

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
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
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
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
  ];
  if (loading) return <Spin tip="Loading course details..." />;

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
