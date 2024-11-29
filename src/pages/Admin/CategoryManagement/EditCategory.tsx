import React, { useEffect, useCallback, useState } from "react";
import { Modal, Button, Form, Input, message, Spin } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
import { CategoryService } from "../../../services/category/category.service";
import { Category } from "../../../model/admin/response/Category.response";

interface EditCategoryProps {
  categoryId: string;
  visible: boolean;
  onClose: () => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({ categoryId, visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchCategoryDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CategoryService.getCategoryDetails(categoryId);
      form.setFieldsValue(res.data?.data);
    } catch {
      message.error("Failed to load category details.");
    } finally {
      setLoading(false);
    }
  }, [categoryId, form]);

  useEffect(() => {
    if (visible) fetchCategoryDetails();
  }, [visible, fetchCategoryDetails]);

  const handleSave = async (values: Category) => {
    setLoading(true);
    try {
      await CategoryService.updateCategory(categoryId, values);
      message.success("Category updated successfully");
      onClose();
    } catch {
      message.error("Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Category"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
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

