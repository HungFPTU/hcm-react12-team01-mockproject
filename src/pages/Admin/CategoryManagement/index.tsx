import React, { useState, useEffect, useCallback, lazy, useRef, Suspense } from "react";
import { Table, Modal, message, Empty, Button, Form, Input, Spin } from "antd";
import { GetCategoryRequest } from "../../../model/admin/request/Category.request";
import { CategoryService } from "../../../services/category/category.service";
import { Category } from "../../../model/admin/response/Category.response";
// import { useNavigate } from "react-router-dom";

const SearchBar = lazy(() => import("./SearchBar"));
const ActionButtons = lazy(() => import("./ActionButtons"));
const AddCategoryButton = lazy(() => import("./AddCategoryButton"));

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const hasMounted = useRef(false);
  // const navigate = useNavigate();

  const fetchCategories = async (params: GetCategoryRequest) => {
    try {
      const response = await CategoryService.getCategory(params);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  };

  const loadCategories = useCallback(async () => {
    const searchCondition = {
      keyword: searchQuery,
      is_parent: true,
      is_delete: false,
    };

    try {
      const response = await fetchCategories({
        searchCondition,
        pageInfo: { pageNum: 1, pageSize: 10 },
      });

      if (response && response.success) {
        setCategories(response.data.pageData);
        setIsDataEmpty(response.data.pageData.length === 0);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (hasMounted.current) {
      loadCategories();
    }
  }, [searchQuery, loadCategories]);

  // Initial load
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    loadCategories();
  }, [loadCategories]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddCategory = async () => {
    await loadCategories();
    message.success("Categories updated successfully.");
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setEditModalVisible(true);
  };

  const handleDeleteCategory = useCallback(
    (categoryId: string) => {
      Modal.confirm({
        title: "Are you sure you want to delete this category?",
        onOk: async () => {
          try {
            const response = await CategoryService.deleteCategory(categoryId);
            if (response.data.success) {
              setCategories((prev) =>
                prev.filter((category) => category._id !== categoryId)
              );
              message.success("Category deleted successfully.");
            }
          } catch {
            message.error("An error occurred while deleting the category");
          }
        },
      });
    },
    []
  );

  const handleSave = async (values: Category) => {
    if (!editingCategory) return;

    setLoading(true);
    try {
      await CategoryService.updateCategory(editingCategory._id, values);
      message.success("Category updated successfully.");
      setEditModalVisible(false);
      setEditingCategory(null);
      loadCategories();
    } catch {
      message.error("Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Parent Category",
      dataIndex: "parent_category_id",
      key: "parent_category_id",
      render: (parent_category_id: string) => {
        const parentCategory = categories.find(
          (category) => category._id === parent_category_id
        );
        return parentCategory ? parentCategory.name : "N/A";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Category) => (
        <ActionButtons
          recordKey={record._id}
          onEdit={() => handleEditCategory(record)}
          onDelete={() => handleDeleteCategory(record._id)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Suspense>
          <SearchBar onSearch={handleSearch} />
          <AddCategoryButton onAdd={handleAddCategory} />
        </Suspense>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8"],
          position: ["bottomRight"],
        }}
        locale={{
          emptyText: isDataEmpty ? (
            <Empty description="No categories found." />
          ) : (
            <Empty />
          ),
        }}
      />

      {/* Edit Category Modal */}
      <Modal
        title="Edit Category"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
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
              rules={[
                { required: true, message: "Please enter the category name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default CategoryManagement;
