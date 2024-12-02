import React, { useEffect, useCallback, useState, useRef } from "react";
import { Modal, Button, Form, Input, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryService } from "../../../services/category/category.service";
import { Category } from "../../../model/admin/response/Category.response";
import { toast } from "react-toastify";
const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();
  const hasMounted = useRef(false);


  const fetchCategoryDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CategoryService.getCategoryDetails(id as string);
      form.setFieldsValue(res.data?.data);  // Set the form values directly
    } catch {
      toast.error("Failed to load category details.");
    } finally {
      setLoading(false);
    }
  }, [id, form]);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    if (id) fetchCategoryDetails();
  }, [id, fetchCategoryDetails]);

  const handleSave = async (values: Category) => {
    setLoading(true);
    try {
      await CategoryService.updateCategory(id as string, values);
      toast.success("Category updated successfully");
      navigate(-1);
    } catch {
      toast.error("Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Category"
      visible={true}
      onCancel={() => navigate(-1)}
      footer={[
        <Button key="cancel" onClick={() => navigate(-1)}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() => form.submit()}
          loading={loading}
        >
          Save
        </Button>,
      ]}
    >
      {loading ? (
        <Spin />
      ) : (
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please enter the category name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      )}
    </Modal>  
  );
};

export default EditCategory;
