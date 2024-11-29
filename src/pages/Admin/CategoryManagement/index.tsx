import React, { useState, useEffect, useCallback, lazy, useRef, Suspense } from "react";
import { Table, Modal, message, Empty } from "antd";
import { GetCategoryRequest } from "../../../model/admin/request/Category.request";
import { CategoryService } from "../../../services/category/category.service";
import { Category } from "../../../model/admin/response/Category.response";
// import { useNavigate } from "react-router-dom";
const EditCategory = lazy(() => import("./EditCategory"));
const SearchBar = lazy(() => import("./SearchBar"));
const ActionButtons = lazy(() => import("./ActionButtons"));
const AddCategoryButton = lazy(() => import("./AddCategoryButton"));

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const hasMounted = useRef(false);

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
    setSearchQuery(query); // Update searchQuery state
  };

  const handleAddCategory = async () => {
    await loadCategories();
    message.success("Categories updated successfully.");
  };

  const handleEditCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedCategoryId(null);
    loadCategories();
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
          onEdit={() => handleEditCategory(record._id)}
          onDelete={() => handleDeleteCategory(record._id)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
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
        locale={{ emptyText: isDataEmpty ? <Empty description="No categories found." /> : <Empty /> }}
      />

      {isEditModalVisible && selectedCategoryId && (
        <EditCategory
          categoryId={selectedCategoryId}
          visible={isEditModalVisible}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default CategoryManagement;

