import { useState, useEffect, useCallback } from "react";
import { Input, Table } from "antd";
import { SessionService } from "../../../services/SessionService/session.service";
import { GetSessionRequest } from "../../../model/admin/request/Session.request";
import { GetSessionResponsePageData } from "../../../model/admin/response/Session.response";
import { toast } from "react-toastify";
const TableSession = () => {
  const [sessionsData, setSessionsData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchSession = async (params: GetSessionRequest) => {
    try {
      const response = await SessionService.getSessions(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch sessions:", error);
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
      } else {
        toast.error("Can't find session.");
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    }
  }, [searchQuery])
  useEffect(() => {
    fetchSessionsData();
  }, []);
  const handleSearch = async () => {
    await fetchSessionsData();
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

      </div>
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
    </div>
  );
};

export default TableSession;
