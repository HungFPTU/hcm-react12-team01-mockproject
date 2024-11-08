import { useState, useEffect, useRef } from "react";
import { Table, Button, Switch, message, Popover, Spin, Modal } from "antd";
import { CourseStatusEnum } from "../../../../../model/Course";

import { CourseService } from "../../../../../services/CourseService/course.service";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";
import { GetCourseRequest } from "../../../../../model/admin/request/Course.request";
import { EyeOutlined, SendOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>(
    []
  );
  const [searchQuery] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const hasMounted = useRef(false);
  const navigate = useNavigate();
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
        setLoading(true);
        const searchCondition = {
          keyword: searchQuery,
          category_id: "",
          // status: CourseStatusEnum.New,
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
          setLoading(false);

          const data = response.data.pageData;
          setCoursesData(data);
          setIsDataEmpty(data.length === 0);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, [searchQuery]);

  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    navigate(`/instructor/manage-course/view-detail-course/${id}`);
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

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await CourseService.deleteCourse(courseId);

      setCoursesData((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );

      message.success("Course deleted successfully!");
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
            statusColor = "text-orange-500";
            borderColor = "border-orange-500";
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
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Session Count",
      dataIndex: "session_count",
      key: "session_count",
      render: (session_count: number) => `${session_count}`,
    },
    {
      title: "Lesson Count",
      dataIndex: "lesson_count",
      key: "lesson_count",
      render: (lesson_count: number) => `${lesson_count}`,
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
                  className={`transition-all duration-300 ${record.status === CourseStatusEnum.Active
                    ? "bg-blue-500"
                    : "bg-gray-500"
                    }`}
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
          <Popover content="View Session Detail">
            <Button
              onClick={() => handleViewDetails(record._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <EyeOutlined />
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

          {record.status === CourseStatusEnum.New && (
            <Popover content="Send course to admin">
              <Button
                className="bg-green-400 hover:bg-green-600 text-white"
                onClick={() => handleSendClick(record._id)}
              >
                <SendOutlined />
              </Button>
            </Popover>
          )}
        </div>
      ),
    },
  ];
  if (loading) return <Spin tip="Loading course details..." />;

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
