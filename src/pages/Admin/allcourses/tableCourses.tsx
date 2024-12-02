import { useState, useEffect, useRef, useCallback } from "react";
import { Table, Popover, Spin, Input, Select } from "antd";
import { CourseStatusEnum } from "../../../model/Course";
import { CourseService } from "../../../services/CourseService/course.service";
import { GetCourseResponsePageData } from "../../../model/admin/response/Course.response";
import { GetCourseRequest } from "../../../model/admin/request/Course.request";
import { toast } from "react-toastify";
const { Option } = Select;

const TableCourses = () => {
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filterValue, setFilterValue] = useState<CourseStatusEnum | undefined>(undefined);
  const hasMounted = useRef(false);
  const fetchCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch {
      toast.error("Fail to fetch courses:");
    }
  };
  const fetchCoursesData = useCallback(async () => {
    try {
      setLoading(true);
      const searchCondition = {
        keyword: searchQuery,
        category_id: "",
        status: filterValue === undefined ? undefined : filterValue,

        is_delete: false,
      };

      const response = await fetchCourse({
        searchCondition,
        pageInfo: {
          pageNum: 1,
          pageSize: 10000,
        },
      });

      if (response && response.success) {
        setLoading(false);

        const data = response.data.pageData;
        setCoursesData(data);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filterValue]);
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchCoursesData();
  }, []);

  const handleSearch = async () => {
    await fetchCoursesData();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: CourseStatusEnum) => {
        let statusText = "";
        let statusColor = "";
        let borderColor = "";
        let popoverContent = "";

        switch (status) {
          case CourseStatusEnum.New:
            statusText = "New";
            statusColor = "text-blue-500";
            borderColor = "border-blue-500";
            popoverContent = "You can send approval request to admin";
            break;
          case CourseStatusEnum.WaitingApprove:
            statusText = "Waiting for Approval";
            statusColor = "text-orange-300";
            borderColor = "border-orange-300";
            popoverContent = "Please watting for the approval from admin";

            break;
          case CourseStatusEnum.Approved:
            statusText = "Approved";
            statusColor = "text-green-500";
            borderColor = "border-green-500";
            popoverContent =
              "Your course has been approved, you can activate the course";

            break;
          case CourseStatusEnum.Rejected:
            statusText = "Rejected";
            statusColor = "text-red-500";
            borderColor = "border-red-500";
            popoverContent =
              "Your course has been rejected, please check your course and resend approval request to admin";

            break;
          case CourseStatusEnum.Active:
            statusText = "Active";
            statusColor = "text-purple-500";
            borderColor = "border-purple-500";
            popoverContent =
              "Your course has been activated, now student can see your course at homepage!";

            break;
          case CourseStatusEnum.Inactive:
            statusText = "Inactive";
            statusColor = "text-gray-500";
            borderColor = "border-gray-500";
            popoverContent =
              "Your course has been inactivated, now student can not see your course at homepage!";

            break;
          default:
            statusText = "Unknown";
            statusColor = "text-gray-500";
            borderColor = "border-gray-500";
            popoverContent = "NO CAP!";

            break;
        }

        return (
          <Popover content={`${popoverContent}`}>
            <span
              className={`font-semibold ${statusColor} border-2 ${borderColor} px-2 py-1 rounded-md`}
            >
              {statusText}
            </span>
          </Popover>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <div className="text-right">{price.toLocaleString()} VND</div>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => (
        <div className="text-right">{discount}%</div>
      ),
    },
    {
      title: "Session Count",
      dataIndex: "session_count",
      key: "session_count",
      render: (session_count: number) => (
        <div className="text-right">{session_count}</div>
      ),
    },
    {
      title: "Lesson Count",
      dataIndex: "lesson_count",
      key: "lesson_count",
      render: (lesson_count: number) => (
        <div className="text-right">{lesson_count}</div>
      ),
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
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Input.Search
            placeholder="Search courses..."
            value={searchQuery}
            onSearch={handleSearch}
            onPressEnter={handleSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            enterButton
          />
          <Select
            placeholder="Filter by status"
            value={filterValue}
            onChange={(value) => setFilterValue(value)}
            style={{ width: 200, marginLeft: 10 }}
          >
            <Option value="">All Status</Option>
            <Option value={CourseStatusEnum.New}>New</Option>
            <Option value={CourseStatusEnum.WaitingApprove}>
              Waiting for Approval
            </Option>
            <Option value={CourseStatusEnum.Approved}>Approved</Option>
            <Option value={CourseStatusEnum.Rejected}>Rejected</Option>
            <Option value={CourseStatusEnum.Active}>Active</Option>
            <Option value={CourseStatusEnum.Inactive}>Inactive</Option>
          </Select>
        </div>
      </div>
      <Table<GetCourseResponsePageData>
        columns={columns}
        dataSource={coursesData}
        rowKey="_id"
        className="w-full shadow-md rounded-lg overflow-hidden"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} courses`,
        }}
      />
    </div>
  );
};

export default TableCourses;
