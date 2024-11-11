import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, Radio, message } from "antd";
import { CreateCourseRequest } from "../../../../../model/admin/request/Course.request";
import { CourseService } from "../../../../../services/CourseService/course.service";
import { CategoryService } from "../../../../../services/category/category.service";
import { Category } from "../../../../../model/admin/response/Category.response";

const { Option } = Select;

const ButtonCourse = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [courseType, setCourseType] = useState("paid"); // State để điều chỉnh hiển thị trường Price và Discount

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      const content = values.content || "";
      console.log(">>>>>>>>>>>values", values);
      const price = Number(values.price);
      const discount = Number(values.discount);

      const { name, description, video_url, image_url, category_id } = values;
      const newCourse: CreateCourseRequest = {
        name,
        category_id,
        description,
        content,
        video_url,
        image_url,
        price: courseType === "paid" ? price : 0,
        discount: courseType === "paid" ? discount : 0, // Nếu là Free, discount sẽ là 0
      };

      const response = await CourseService.createCourse(newCourse);
      if (response && response.data.success) {
        message.success("Khóa học đã được tạo thành công!");
        console.log("API Response:", response);
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  useEffect(() => {
    const params = {
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

    CategoryService.getCategory(params)
      .then((response) => {
        if (response && response.data && response.data.data) {
          setCategoryData(response.data.data.pageData);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <>
      <Button onClick={showModal} style={{ marginRight: "10px" }}>
        Create Course
      </Button>

      <Modal
        title="Create Course"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Category"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn thể loại">
              {categoryData.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Nhập mô tả khóa học" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Nhập nội dung khóa học" />
          </Form.Item>

          <Form.Item
            name="image_url"
            label="Image URL"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Nhập đường dẫn hình ảnh"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="video_url"
            label="Video URL"
            labelCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Nhập đường dẫn video"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {courseType === "paid" && (
            <Form.Item
              name="price"
              label="Price"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Giá là trường bắt buộc" },
                {
                  validator: (_, value) => {
                    if (value && !isNaN(value) && Number(value) >= 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Giá phải là số không âm"));
                  },
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Nhập giá khóa học"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = value;
                }}
              />
            </Form.Item>
          )}

          {courseType === "paid" && (
            <Form.Item
              name="discount"
              label="Discount"
              labelCol={{ span: 24 }}
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder="Nhập phần trăm giảm giá (nếu có)"
              />
            </Form.Item>
          )}

          <Form.Item
            name="courseType"
            label="Course Type"
            labelCol={{ span: 24 }}
          >
            <Radio.Group onChange={(e) => setCourseType(e.target.value)}>
              <Radio value="free">Free</Radio>
              <Radio value="paid">Paid</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Course
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonCourse;
