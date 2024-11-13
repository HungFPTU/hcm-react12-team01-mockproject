import { Button, Form, Input, Row, Col, message } from "antd";
import { useState, useEffect, useCallback, useMemo } from "react";
import { CategoryService } from "../../../services/category/category.service";
import { UpdateCategoryRequest } from "../../../model/admin/request/Category.request";
import { Category } from "../../../model/admin/response/Category.response";
import { ApiResponse } from "../../../model/ApiResponse";

interface EditCategoryProps {
  id: string;
  onClose: () => void;
  onUpdate: () => void; // New prop for update callback
}

const EditCategory: React.FC<EditCategoryProps> = ({ id, onClose, onUpdate }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState<{
    category: ApiResponse<Category> | null;
    categoryData: Category | null;
    loading: boolean;
  }>({
    category: null,
    categoryData: null,
    loading: false,
  });

  const validationRules = useMemo(
    () => ({
      name: [{ required: true, message: "Please enter the category name" }],
    }),
    []
  );

  const fetchCategoryDetails = useCallback(
    async (id: string) => {
      try {
        const res = await CategoryService.getCategoryDetails(id);
        const categoryData = res.data?.data as Category;

        if (categoryData) {
          setState((prev) => ({
            ...prev,
            category: res.data as ApiResponse<Category>,
            categoryData,
          }));
          form.setFieldsValue(categoryData);
        } else {
          message.error("No data available for this category.");
        }
      } catch {
        message.error("Failed to fetch category details. Please try again.");
      }
    },
    [form]
  );

  useEffect(() => {
    fetchCategoryDetails(id);
  }, [id, fetchCategoryDetails]);

  const handleFormSubmit = useCallback(
    async (values: UpdateCategoryRequest) => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        await CategoryService.updateCategory(id, values);
        form.resetFields();
        message.success("Category updated successfully");
        onClose(); // Close the modal on successful update
        onUpdate(); // Trigger the update callback to refresh categories
      } catch {
        message.error("Failed to update category. Please try again.");
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [id, onClose, onUpdate, form]
  );

  if (!state.category) {
    return <div>Loading category data...</div>;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      initialValues={state.categoryData || undefined}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Name" name="name" rules={validationRules.name}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={state.loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCategory;
