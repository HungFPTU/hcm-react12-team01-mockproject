import { useState, useEffect, useRef } from "react";
import { Table, Button, Popover, Modal, Input, Form } from "antd";
import { GetCourseResponsePageData } from "../../../model/admin/response/Course.response";
import { GetCourseRequest } from "../../../model/admin/request/Course.request";
import { CourseService } from "../../../services/CourseService/course.service";
import { CourseStatusEnum } from "../../../model/Course";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleFilled } from "@ant-design/icons";

const TableCoursesPending = () => {
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>([]);
  const [searchQuery] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<GetCourseResponsePageData | null>(null);
  const [status, setStatus] = useState<CourseStatusEnum>(CourseStatusEnum.WaitingApprove);
  const [comment, setComment] = useState<string>('');

  const hasMounted = useRef(false);

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
        status: CourseStatusEnum.WaitingApprove,
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
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;


    fetchCoursesData();
  }, [searchQuery]);

  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (course: GetCourseResponsePageData) => {
    setStatus(CourseStatusEnum.Approved)
    handleOk();
    setSelectedCourse(course);
  };
  const handleReject = (course: GetCourseResponsePageData) => {
    setStatus(CourseStatusEnum.Rejected)
    setSelectedCourse(course);
    setIsModalVisible(true);
  };
  //====================================================
  const handleOk = async () => {
    if (!selectedCourse) return;

    try {
      const response = await CourseService.changeStatusCourse({
        course_id: selectedCourse._id,
        new_status: status,
        comment: comment,
      });
      if (response && response.data && response.data.success) {
        console.log("Course status updated successfully:", response.data);
        if (status === CourseStatusEnum.Approved) {
          toast.success(`Course status changed to Approved successfully!`);
        } else if (status === CourseStatusEnum.Rejected) {
          toast.success(`Course status changed to Rejected. Comment: ${comment}`);
          setIsModalVisible(false);
        }
        setComment("");
      } else {
        console.error("Failed to update course status:", response.data);
        // toast.error('Failed to change course status!');
      }
    } catch (error) {
      console.error("Error changing course status:", error);
      // toast.error('An error occurred while changing course status!');
    } finally {
      fetchCoursesData();
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setStatus(CourseStatusEnum.WaitingApprove);
    setComment("");
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
          case CourseStatusEnum.WaitingApprove:
            statusText = "Waiting for Approval";
            statusColor = "text-orange-300";
            borderColor = "border-orange-300";
            popoverContent = "Please waiting for the approval from admin";

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
      render: (price: number) => (
        <div className="text-right">
          {price.toLocaleString()} VND
        </div>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => (
        <div className="text-right">
          {discount}%
        </div>
      ),
    },
    {
      title: "Session Count",
      dataIndex: "session_count",
      key: "session_count",
      render: (session_count: number) => (
        <div className="text-right">
          {session_count}
        </div>
      ),
    },
    {
      title: "Lesson Count",
      dataIndex: "lesson_count",
      key: "lesson_count",
      render: (lesson_count: number) => (
        <div className="text-right">
          {lesson_count}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "actions",
      render: (_: unknown, record: GetCourseResponsePageData) => (
        <>
          <Popover content="Approve">
            <Button
              onClick={() => handleApprove(record)}
              className="bg-green-500 hover:bg-blue-600 text-white"
            >
              <CheckCircleOutlined />
            </Button>
          </Popover>
          <Popover content="Reject">
            <Button
              onClick={() => handleReject(record)}
              className="bg-red-500 hover:bg-blue-600 text-white"
            >
              <CloseCircleFilled />
            </Button>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div className="w-full">

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


      <Modal
        title="Change Course Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <Form>
          <Form.Item label="Reason for rejection ">
            <Input.TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Please provide a reason"
            />
          </Form.Item>

        </Form>
      </Modal>

    </div>
  );
};

export default TableCoursesPending;
