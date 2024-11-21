import { useState, useEffect, useRef } from "react";
import { Table, Button, Switch, message, Popover, Spin, Modal, Form, Input, Select, Radio } from "antd";
import { CourseStatusEnum } from "../../../../../model/Course";
import { CourseService } from "../../../../../services/CourseService/course.service";
import { CategoryService } from "../../../../../services/category/category.service";
import { GetCourseRequest } from "../../../../../model/admin/request/Course.request";
import { SendOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GetCategoryRequest } from "../../../../../model/admin/request/Category.request";
import ButtonCourse from "../ButtonCourse";
import { Editor } from "@tinymce/tinymce-react";

const { Option } = Select;
interface Course {
  _id: string;
  name: string;
  session: string;
  category_name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  session_count: number;
  lesson_count: number;
}
const convertToCourse = (data: any): Course => {
  return {
    _id: data._id,
    name: data.name,
    session: data.session || "",
    category_name: data.category_name || "",
    category_id: data.category_id,
    user_id: data.user_id,
    description: data.description,
    content: data.content || "",
    status: data.status,
    video_url: data.video_url,
    image_url: data.image_url,
    price: data.price,
    discount: data.discount,
    created_at: data.created_at,
    updated_at: data.updated_at,
    is_deleted: data.is_deleted,
    session_count: data.session_count,
    lesson_count: data.lesson_count,
  };
};

const CourseTable = () => {
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [courseType, setCourseType] = useState("free");
  const [filterValue, setFilterValue] = useState<CourseStatusEnum | undefined>(
    undefined
  );
  const editorRef = useRef<any>(null); // Tham chiếu đến TinyMCE editor


  const [formData, setFormData] = useState({
    image_url: "",
    video_url: "",
  });

  const hasMounted = useRef(false);
  const fetchCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch courses:", error);
    }
  };
  const params: GetCategoryRequest = {
    searchCondition: {
      keyword: "",
      is_parent: true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };

  const fetchCategoriesData = async () => {
    try {
      const response = await CategoryService.getCategory(params);
      if (response && response.data.success) {
        setCategories(response.data.data.pageData);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCoursesData = async () => {
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
          pageSize: 1000,
        },
      });

      if (response && response.success) {
        setLoading(false);
        const convertedData = response.data.pageData.map(convertToCourse);
        setCoursesData(convertedData);
        setIsDataEmpty(convertedData.length === 0);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    fetchCoursesData();
    fetchCategoriesData();
  }, []);

  const handleUpdate = async (courseId: string) => {
    try {
      const response = await CourseService.getCourseById(courseId);
      if (response && response.data && response.data.data) {
        const course = convertToCourse(response.data.data);
        if (course.price > 0) {
          setCourseType("paid")
        } else setCourseType("free")
        setSelectedCourse(course);

        setFormData({
          image_url: course.image_url,
          video_url: course.video_url,
        });
        const categoryName = coursesData.find(
          (c) => c.category_id === course.category_id
        )?.category_name;
        setSelectedCategoryName(categoryName || "");
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedCourse(null);
    setSelectedCategoryName("");
  };

  const handleSaveCourse = async () => {
    if (!selectedCourse) return;

    const updatedCourse = {
      ...selectedCourse,
      name: selectedCourse.name,
      description: selectedCourse.description,
      category_id: selectedCourse.category_id,
      content: selectedCourse.content,
      image_url: formData.image_url,
      video_url: formData.video_url,
      price: selectedCourse.price,
      discount: selectedCourse.discount,
    };

    try {
      const response = await CourseService.updateCourse(
        selectedCourse._id,
        updatedCourse
      );
      if (response && response.data.success) {
        message.success("Course updated successfully!");
        fetchCoursesData();
        setIsModalVisible(false);
      } else {
        message.error("Failed to update course.");
      }
    } catch (error) {
      message.error("Error updating course.");
      console.error("Error updating course:", error);
    }
  };

  const onChangeStatus = async (id: string, status: CourseStatusEnum) => {
    try {
      const response = await CourseService.changeStatusCourse({
        course_id: id,
        new_status: status,
        comment: `Changed status to ${status}`,
      });
      if (response && response.data.success) {
        setCoursesData((prevCourses) =>
          prevCourses.map((course) =>
            course._id === id ? { ...course, status } : course
          )
        );

        message.success(`Course status updated to ${status}!`);
      }
    } catch (error) {
      message.error("Failed to update course status!");
      console.error("Error changing status:", error);
    }
  };

  const handleSendClick = async (courseId: string) => {
    try {
      const course = coursesData.find((course) => course._id === courseId);
      if (!course) return;

      if (
        ![CourseStatusEnum.New, CourseStatusEnum.Rejected].includes(
          course.status
        )
      ) {
        message.error("Invalid course status for sending.");
        return;
      }

      const response = await CourseService.changeStatusCourse({
        course_id: courseId,
        new_status: CourseStatusEnum.WaitingApprove,
        comment: "Sent to admin for approval",
      });
      if (response && response.data.success) {
        setCoursesData((prevCourses) =>
          prevCourses.map((course) =>
            course._id === courseId
              ? { ...course, status: CourseStatusEnum.WaitingApprove }
              : course
          )
        );
        message.success("Course status updated to Waiting for Approval!");
      }
    } catch (error) {
      console.error("Error sending course:", error);
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
  const handleSearch = () => {
    fetchCoursesData();
  };

  const extractYouTubeID = (url: string) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
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
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
    {
      title: "Change Status",
      key: "changeStatus",
      render: (_: unknown, record: Course) => {
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
      render: (_: unknown, record: Course) => (
        <div className="flex space-x-2">
          <Popover content="Update Course">
            <Button
              onClick={() => handleUpdate(record._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <EditOutlined />
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

          {[CourseStatusEnum.New, CourseStatusEnum.Rejected].includes(
            record.status
          ) && (
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
        <ButtonCourse />
      </div>

      {isDataEmpty ? (
        <div className="text-center text-red-500">No courses found.</div>
      ) : (
        <Table<Course>
          columns={columns}
          dataSource={coursesData}
          rowKey="_id"
          className="w-full shadow-md rounded-lg overflow-hidden"
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title="Update Course"
        visible={isModalVisible}
        width={800}
        onCancel={handleModalCancel}
        footer={null}

      >
        {selectedCourse && (
          <Form layout="vertical">
            {/* Course Name */}
            <Form.Item
              label={
                <span>
                  <span style={{ color: "red" }}>*</span> Name
                </span>
              }
              validateStatus={!selectedCourse?.name ? "error" : ""}
              help={!selectedCourse?.name ? "Course name is required" : ""}
            >
              <Input
                value={selectedCourse?.name || ""}
                onChange={(e) =>
                  setSelectedCourse((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
              />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  <span style={{ color: "red" }}>*</span> Category
                </span>
              }
              validateStatus={!selectedCategoryName ? "error" : ""}
              help={!selectedCategoryName ? "Category is required" : ""}
            >
              <Select
                value={selectedCategoryName || ""}
                onChange={(value) => {
                  const category = categories.find((c) => c.name === value);
                  setSelectedCourse((prev) =>
                    prev ? { ...prev, category_id: category?._id || "" } : null
                  );
                  setSelectedCategoryName(value);
                }}
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category.name}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <span>
                  <span style={{ color: "red" }}>*</span> Description
                </span>
              }
              validateStatus={!selectedCourse?.description ? "error" : ""}
              help={!selectedCourse?.description ? "Description is required" : ""}
            >
              <Editor
                onInit={(_evt, editor) => (editorRef.current = editor)}
                apiKey="8pum9vec37gu7gir1pnpc24mtz2yl923s6xg7x1bv4rcwxpe"
                //selectedCourse
                value={selectedCourse.description || ''}
                onEditorChange={(content) => setSelectedCourse({ ...selectedCourse, description: content })}

                init={{
                  width: "100%",
                  height: 300,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "help",
                  ],
                  toolbar:
                    "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | link image | print preview media fullscreen | " +
                    "forecolor backcolor emoticons | help",
                  menubar: "file edit view insert format tools table help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                }}
              />
            </Form.Item>

            <Form.Item label="Video URL">
              <Input
                value={formData.video_url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, video_url: e.target.value }))
                }
                placeholder="Enter video URL"
              />
            </Form.Item>
            {formData.video_url && (
              formData.video_url.includes('youtube.com') || formData.video_url.includes('youtu.be') ? (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${extractYouTubeID(formData.video_url)}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ marginTop: '10px' }}
                ></iframe>
              ) : (
                <video src={formData.video_url} controls style={{ width: '100%', marginTop: '10px' }} />
              )
            )}

            {/* New Image Input Field */}
            <Form.Item label={
              <span>
                <span style={{ color: "red" }}>*</span> Image URL
              </span>
            }
              validateStatus={!selectedCourse?.image_url ? "error" : ""}
              help={!selectedCourse?.image_url ? "Image URL is required" : ""}>
              <Input
                value={formData.image_url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                }
                placeholder="Enter image URL"
              />
            </Form.Item>
            {formData.image_url && (
              <img src={formData.image_url} alt="Selected" style={{ width: '100%', marginTop: '10px' }} />
            )}

            <Form.Item
              className="mt-3"
              name="courseType"
              label={
                <span>
                  <span style={{ color: "red" }}>*</span> Course Type
                </span>
              }
              help={!selectedCourse?.image_url ? "Course Type is required" : ""}
              labelCol={{ span: 24 }}
            >
              <Radio.Group
                onChange={(e) => setCourseType(e.target.value)}
                defaultValue={courseType}
              >
                <Radio value="free">Free</Radio>
                <Radio value="paid">Paid</Radio>
              </Radio.Group>
            </Form.Item>
            {courseType === "paid" && (
              <Form.Item
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> Price
                  </span>
                }

              >
                <Input
                  type="number"
                  value={selectedCourse.price}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse,
                      price: Number(e.target.value),
                    })
                  }
                />
              </Form.Item>
            )}

            {courseType === "paid" && (
              <Form.Item label="Discount">
                <Input
                  type="number"
                  value={selectedCourse.discount}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse,
                      discount: Number(e.target.value),
                    })
                  }
                />
              </Form.Item>
            )}

            <Button
              type="primary"
              onClick={handleSaveCourse}
              icon={<SendOutlined />}

            >
              Save
            </Button>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default CourseTable;
