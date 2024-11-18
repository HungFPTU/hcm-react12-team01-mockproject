import React, { useEffect, useState,useRef } from "react";
import { Button, message, Form, Modal, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CategoryService } from "../../../services/category/category.service";
import { GetCategoryResponse } from "../../../model/admin/response/Category.response";

interface AddCategoryButtonProps {
  onAdd: () => void;
}

const AddCategoryButton: React.FC<AddCategoryButtonProps> = ({ onAdd }) => {
  const [categories, setCategories] = useState<GetCategoryResponse | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [form] = Form.useForm();
  const hasMounted = useRef(false);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getCategory({
        pageInfo: { pageNum: 1, pageSize: 100 },
        searchCondition: { keyword: "", is_parent: false, is_delete: false },
      });
      setCategories(response.data?.data || null);
    } catch (error) {
      message.error("An unexpected error occurred while fetching categories");
      console.error("Fetch categories error:", error);
    }
  };

  useEffect(() => {
    if (hasMounted.current) return; // Trả về nếu đã mount
    hasMounted.current = true;
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const { name, parent_category_id, description } = form.getFieldsValue();

      const newCategory = { name, description, parent_category_id };

      const createdCategory = await CategoryService.createCategory(newCategory);

      const resolvedCategory: GetCategoryResponse = {
        pageData: [
          {
            _id: createdCategory.data.data._id,
            name: createdCategory.data.data.name,
            parent_category_id: createdCategory.data.data.parent_category_id,
            description: createdCategory.data.data.description,
            created_at: createdCategory.data.data.created_at,
            updated_at: createdCategory.data.data.updated_at,
            is_deleted: createdCategory.data.data.is_deleted,
          },
        ],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          totalItems: 1,
          totalPages: 1,
        },
      };

      setCategories(resolvedCategory);
      form.resetFields();
      setOpen(false);
      message.success("Category created successfully!");
      onAdd();
    } catch (error) {
      console.error("Error creating category:", error);
      message.error("Failed to create category. Please try again.");
    }
  };

  const handleOpenModal = () => {
    form.resetFields();
    setOpen(true);
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleOpenModal}
        style={{ backgroundColor: "green" }}
      >
        New Category
      </Button>
      <Modal
        open={isOpen}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input category name" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Parent Category" name="parent_category_id">
            <Select>
              {categories && categories.pageData && categories.pageData.length > 0 ? (
                categories.pageData
                  .filter((category) => !category.parent_category_id)
                  .map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))
              ) : (
                <Select.Option value="" disabled>
                  No categories available
                </Select.Option>
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategoryButton;
