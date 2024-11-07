import { useState, useEffect, useRef } from "react";
import { Table, Button, Switch, message, Popover } from "antd";
import { CourseStatusEnum } from "../../../../../model/Course";
import { useNavigate } from "react-router-dom";
import { CourseService } from "../../../../../services/CourseService/course.service";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";
import { GetCourseRequest } from "../../../../../model/admin/request/Course.request";
import { EyeOutlined, SendOutlined } from "@ant-design/icons";

const CourseTable = () => {
  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>([]);
  const [searchQuery] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const hasMounted = useRef(false);

  const fetchCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch courses:", error);
    }
  };

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
          setIsDataEmpty(data.length === 0);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCoursesData();
  }, [searchQuery]);

  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (courseId: string) => {
    navigate(`/instructor/manage-course/view-detail-course/${courseId}`);
  };

  const onChangeStatus = async (id: string, status: CourseStatusEnum) => {
    try {
      await CourseService.changeStatusCourse({
        course_id: id,
        new_status: status,
        comment: `Changed status to ${status}`,
      });

      setCoursesData((prevCourses) =>
        prevCourses.map((course) =>
          course._id === id ? { ...course, status } : course
        )
      );

      message.success(`Course status updated to ${status}!`);
    } catch (error) {
      message.error("Failed to update course status!");
      console.error("Error changing status:", error);
    }
  };

  const handleSendClick = async (courseId: string) => {
    try {
      await CourseService.changeStatusCourse({
        course_id: courseId,
        new_status: CourseStatusEnum.WaitingApprove,
        comment: "Thay đổi trạng thái khóa học",
      });

      setCoursesData((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? { ...course, status: CourseStatusEnum.WaitingApprove }
            : course
        )
      );

      message.success("Course status updated to Waiting Approve!");
    } catch (error) {
      message.error("Failed to update course status!");
      console.error("Error changing status:", error);
    }
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: CourseStatusEnum) => {
        let statusText = "";
        let statusColor = "";
        let borderColor = "";

        switch (status) {
          case CourseStatusEnum.New:
            statusText = "New";
            statusColor = "text-blue-500";
            borderColor = "border-blue-500";
            break;
          case CourseStatusEnum.WaitingApprove:
            statusText = "Waiting for Approval";
            statusColor = "text-orange-500";
            borderColor = "border-orange-500";
            break;
          case CourseStatusEnum.Approved:
            statusText = "Approved";
            statusColor = "text-green-500";
            borderColor = "border-green-500";
            break;
          case CourseStatusEnum.Rejected:
            statusText = "Rejected";
            statusColor = "text-red-500";
            borderColor = "border-red-500";
            break;
          case CourseStatusEnum.Active:
            statusText = "Active";
            statusColor = "text-purple-500";
            borderColor = "border-purple-500";
            break;
          case CourseStatusEnum.Inactive:
            statusText = "Inactive";
            statusColor = "text-gray-500";
            borderColor = "border-gray-500";
            break;
          default:
            statusText = "Unknown";
            statusColor = "text-gray-500";
            borderColor = "border-gray-500";
            break;
        }

        return (
          <span
            className={`font-semibold ${statusColor} border-2 ${borderColor} px-2 py-1 rounded-md`}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
    {
      title: "Change Status",
      key: "changeStatus",
      render: (_: unknown, record: GetCourseResponsePageData) => {
        // Kiểm tra nếu khóa học có trạng thái là 'Approved', 'Active', hoặc 'Inactive'
        const canChangeStatus = [
          CourseStatusEnum.Approved,
          CourseStatusEnum.Active,
          CourseStatusEnum.Inactive,
        ].includes(record.status);

        return (
          <div>
            {canChangeStatus && (
              <Popover
                content={<div>Click to activate your course</div>}
                title="Status Update"
                trigger="hover"
                placement="top"
                arrowPointAtCenter
                className="transition-all duration-300"
              >
                <Switch
                  checked={record.status === CourseStatusEnum.Active}
                  onChange={(checked) => {
                    const newStatus = checked
                      ? CourseStatusEnum.Active
                      : CourseStatusEnum.Inactive;
                    onChangeStatus(record._id, newStatus);
                  }}
                  disabled={!canChangeStatus}
                  className={`transition-all duration-300 ${record.status === CourseStatusEnum.Active ? 'bg-blue-500' : 'bg-gray-500'}`}
                />
              </Popover>
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "actions",
      render: (_: unknown, record: GetCourseResponsePageData) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => handleViewDetails(record._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <EyeOutlined />
          </Button>
    
          {/* Kiểm tra nếu trạng thái là 'New' mới hiển thị nút 'Send' */}
          {record.status === CourseStatusEnum.New && (
            <Button
              className="bg-green-400 hover:bg-green-600 text-white"
              onClick={() => handleSendClick(record._id)}
            >
              <SendOutlined />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {isDataEmpty ? (
        <div className="text-center text-red-500">No courses found.</div>
      ) : (
        <Table<GetCourseResponsePageData>
          columns={columns}
          dataSource={filteredCourses}
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
      )}
    </div>
  );
};

export default CourseTable;
