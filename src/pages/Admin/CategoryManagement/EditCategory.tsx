import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Row, Col, message, Modal } from "antd";
import { useState, useEffect, useCallback, useMemo } from "react";
import { CategoryService } from "../../../services/category/category.service";
import { UpdateCategoryRequest } from "../../../model/admin/request/Category.request";
import { Category } from "../../../model/admin/response/Category.response";
import { ROUTER_URL } from "../../../const/router.const";
import { ApiResponse } from "../../../model/ApiResponse";

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
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
          message.error("No page data available for this category.");
        }
      } catch (error) {
        message.error("Failed to fetch category details. Please try again.");
      }
    },
    [form]
  );

  useEffect(() => {
    if (id) {
      fetchCategoryDetails(id);
    }
  }, [id, fetchCategoryDetails]);

  const handleFormSubmit = useCallback(
    async (values: UpdateCategoryRequest) => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        await CategoryService.updateCategory(id as string, values);
        form.resetFields();
        navigate(ROUTER_URL.ADMIN.CATEGORY);
        message.success("Category updated successfully");
      } catch (error) {
        message.error("Failed to update category. Please try again.");
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [id, navigate, form]
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    form.submit();
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  if (!state.category) {
    return <div>Category not found.</div>;
  }

  return (
    <>
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
            <Form.Item
              label={<span className="font-medium text-[#1a237e]">Description</span>}
              name="description"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleOpenModal}
            loading={state.loading}
            className="bg-gradient-tone"
          >
            Save
          </Button>
          <Link to={ROUTER_URL.ADMIN.CATEGORY}>
            <Button className="ml-3">Back</Button>
          </Link>
        </Form.Item>
      </Form>

      <Modal
        title="Confirm Update"
        open={isModalOpen} // Use `open` instead of `visible`
        onOk={handleModalConfirm}
        onCancel={handleModalCancel}
        confirmLoading={state.loading}
      >
        <p>Are you sure you want to save the changes to this category?</p>
      </Modal>
    </>
  );
};

export default EditCategory;
