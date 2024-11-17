import { useState, useEffect, useRef } from "react";
import { Table, Button, Switch, message, Popover, Modal, Input, Select } from "antd";
import { CourseStatusEnum } from "../../../../../model/Course";
import { CourseService } from "../../../../../services/CourseService/course.service";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";
import { GetCourseRequest } from "../../../../../model/admin/request/Course.request";
import { EyeOutlined, SendOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../../utils/helper";
import ButtonCourse from "../ButtonCourse";

const { Option } = Select;

const CourseTable = () => {
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<GetCourseResponsePageData[]>([]);
  const [filterValue, setFilterValue] = useState<CourseStatusEnum | undefined>(undefined);

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

  const fetchCoursesData = async () => {
    try {
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
          pageSize: 1000,
        },
      });

      if (response && response.success) {
        const data = response.data.pageData;
        setCoursesData(data);
        setIsDataEmpty(data.length === 0);
        setFilteredCourses(data);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchCoursesData();
  }, []);

  useEffect(() => {
    if (coursesData.length > 0) {
      console.log("Có khóa học trong coursesData:", coursesData);
    }
  }, [coursesData]);

  const handleSearch = () => {
    fetchCoursesData();
  };

  const handleViewDetails = (id: string) => {
    navigate(`/instructor/manage-course/view-detail-course/${id}`);
  };

  const onChangeStatus = async (id: string, currentStatus: CourseStatusEnum) => {
    const newStatus = currentStatus === CourseStatusEnum.Active ? CourseStatusEnum.Inactive : CourseStatusEnum.Active;
    setCoursesData((prevCourses) =>
      prevCourses.map((course) =>
        course._id === id ? { ...course, status: newStatus } : course
      )
    );

    try {
      const response = await CourseService.changeStatusCourse({
        course_id: id,
        new_status: newStatus,
        comment: `Changed status to ${newStatus}`,
      });
      if (response && response.data.success) {
        message.success(`Course status updated to ${newStatus}!`);
        fetchCoursesData();
      } else {
        setCoursesData((prevCourses) =>
          prevCourses.map((course) =>
            course._id === id ? { ...course, status: currentStatus } : course
          )
        );
        message.error("Failed to update course status!");
      }
    } catch (error) {
      setCoursesData((prevCourses) =>
        prevCourses.map((course) =>
          course._id === id ? { ...course, status: currentStatus } : course
        )
      );
      message.error("Failed to update course status!");
      console.error("Error changing status:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await CourseService.deleteCourse(courseId);
      if (response && response.data.success) {
        setCoursesData((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );
        message.success("Course deleted successfully!");
      }
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
      title: "Session",
      dataIndex: "session_count",
      key: "session_count",
      render: (session_count: number) => (session_count ? session_count : "-"),
    },
    {
      title: "Lesson",
      dataIndex: "lesson_count",
      key: "lesson_count",
      render: (lesson_count: number) => (lesson_count ? lesson_count : "-"),
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
            popoverContent = "Please wait for the approval from admin";
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
              "Your course has been activated, now students can see your course at the homepage!";
            break;
          case CourseStatusEnum.Inactive:
            statusText = "Inactive";
            statusColor = "text-gray-500";
            borderColor = "border-gray-500";
            popoverContent =
              "Your course has been inactivated, now students cannot see your course at the homepage!";
            break;
          default:
            statusText = "Unknown";
            statusColor = "text-gray-500";
            borderColor = "border-gray-500";
            popoverContent = "NO CAP!";
            break;
        }

        return (
          <Popover content={popoverContent}>
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
      render: (price: number) => {
        return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => (discount ? `${discount}%` : "-"),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => (created_at ? formatDate(new Date(created_at)) : "-"),
    },
    {
      title: "Change Status",
      key: "change_status",
      render: (_: unknown, record: GetCourseResponsePageData) => {
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
                  onChange={() => onChangeStatus(record._id, record.status)}
                  disabled={!canChangeStatus}
                  className={`transition-all duration-300 ${record.status === CourseStatusEnum.Active
                      ? "bg-purple-500"
                      : "bg-gray-500"
                    }`}
                />
              </Popover>
            )}
          </div>
        );
      }
    },
    {
      title: "Action",
      key: "actions",
      render: (_: unknown, record: GetCourseResponsePageData) => (
        <div className="flex space-x-2">
          <Popover content="View Course Detail">
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

          {/* Điều kiện hiển thị nút "Send" */}
          {([CourseStatusEnum.New, CourseStatusEnum.Rejected].includes(record.status)
            && record.session_count > 0 && record.lesson_count > 0) && (
              <Popover content="Send course to admin">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => onChangeStatus(record._id, CourseStatusEnum.WaitingApprove)}
                >
                  <SendOutlined />
                </Button>
              </Popover>
            )}
        </div>
      ),
    },
  ];

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
            <Option value={CourseStatusEnum.WaitingApprove}>Waiting for Approval</Option>
            <Option value={CourseStatusEnum.Approved}>Approved</Option>
            <Option value={CourseStatusEnum.Rejected}>Rejected</Option>
            <Option value={CourseStatusEnum.Active}>Active</Option>
            <Option value={CourseStatusEnum.Inactive}>Inactive</Option>
          </Select>
        </div>
        <ButtonCourse />
      </div>
      {isDataEmpty ? (
        <div className="text-center text-red-500">No courses found.</div>
      ) : (
        <Table<GetCourseResponsePageData>
          columns={columns}
          dataSource={filteredCourses}
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
    </div>
  );
};

export default CourseTable;