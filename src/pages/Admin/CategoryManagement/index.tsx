import React, { useState, useEffect, useCallback, lazy, useRef } from "react";
import { Table, Modal, message, Empty } from "antd";
import { GetCategoryRequest } from "../../../model/admin/request/Category.request";
import { CategoryService } from "../../../services/category/category.service";
import { Category } from "../../../model/admin/response/Category.response";
import { useNavigate } from "react-router-dom";

const SearchBar = lazy(() => import("./SearchBar"));
const ActionButtons = lazy(() => import("./ActionButtons"));
const AddCategoryButton = lazy(() => import("./AddCategoryButton"));

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Sub Category");
  const [isDataEmpty, setIsDataEmpty] = useState(false); // Track if data is empty
  const hasMounted = useRef(false);
  const navigate = useNavigate();
  // Function to fetch categories from API
  const fetchCategories = async (params: GetCategoryRequest) => {
    try {
      const response = await CategoryService.getCategory(params);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (hasMounted.current) return; // Trả về nếu đã mount
    hasMounted.current = true;
    const fetchCategoriesData = async () => {
      try {
        const searchCondition = {
          keyword: searchQuery,
          is_parent: searchType === "Parent Category",
          is_delete: false,
        };

        const response = await fetchCategories({
          searchCondition,
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        });

        if (response && response.success) {
          const data = response.data.pageData;
          setCategories(data);
          setIsDataEmpty(data.length === 0); // Check if data is empty
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategoriesData();
  }, [searchQuery, searchType]);

  // Handle search functionality
  const handleSearch = (query: string, type: string) => {
    setSearchQuery(query);
    setSearchType(type);
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    try {
      const response = await fetchCategories({
        searchCondition: {
          keyword: searchQuery,
          is_parent: searchType === "Parent Category",
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });
  
      if (response && response.success) {
        setCategories(response.data.pageData);
        setIsDataEmpty(response.data.pageData.length === 0);
        message.success("Categories updated successfully.");
      }
    } catch (error) {
      console.error("Failed to refresh categories:", error);
    }
  };
  


  const handleDeleteCategory = useCallback(
    (categoryId: string) => {
      Modal.confirm({
        title: "Are you sure you want to delete this category?",
        onOk: async () => {
          try {
            const response = await CategoryService.deleteCategory(categoryId);
            if (response.data.success) {
              setCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== categoryId)
              );
              message.success("Category deleted successfully.");
            }
          } catch (error) {
            message.error(
              error instanceof Error
                ? error.message
                : "An error occurred while deleting the category"
            );
            console.error("Failed to delete category:", error);
          }
        },
      });
    },
    []
  );

  // Columns for the table
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
          onEdit={() => navigate(`/Admin/category-management/${record._id}`)}
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
        <SearchBar onSearch={handleSearch} />
        <AddCategoryButton onAdd={handleAddCategory} />
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
    </div>
  );
};

export default CategoryManagement;
