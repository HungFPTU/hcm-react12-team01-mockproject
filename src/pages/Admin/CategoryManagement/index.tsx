import React, { useState } from "react";
import { Table } from "antd";
import SearchBar from "./SearchBar";
import ActionButtons from "./ActionButtons";
import AddCategoryButton from "./AddCategoryButton";

// Sample data for categories
const initialCategories = [
  {
    key: "1",
    categoryName: "Curriculum Development",
    parentCategory: "Education",
  },
  {
    key: "2",
    categoryName: "Educational Technology",
    parentCategory: "Education",
  },
  { key: "3", categoryName: "Teaching Methods", parentCategory: "Education" },
  { key: "4", categoryName: "Music Production", parentCategory: "Music" },
  { key: "5", categoryName: "Instrument Lessons", parentCategory: "Music" },
  { key: "6", categoryName: "Music Theory", parentCategory: "Music" },
  { key: "7", categoryName: "Painting", parentCategory: "Arts & Crafts" },
];

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [filteredCategories, setFilteredCategories] = useState(categories);

  // Handle search functionality
  const handleSearch = (value: string) => {
    const filtered = categories.filter(
      (category) =>
        category.categoryName.toLowerCase().includes(value.toLowerCase()) ||
        category.parentCategory.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    alert("Add New Category");
  };

  // Handle edit and delete actions
  const handleEdit = (key: string) => {
    alert(`Edit category with key ${key}`);
  };

  const handleDelete = (key: string) => {
    const newCategories = categories.filter((category) => category.key !== key);
    setCategories(newCategories);
    setFilteredCategories(newCategories);
  };

  // Columns for the table
  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Parent Category",
      dataIndex: "parentCategory",
      key: "parentCategory",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <ActionButtons
          recordKey={record.key}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
        dataSource={filteredCategories}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8"],
          position: ["bottomRight"],
        }}
      />
    </div>
  );
};

export default CategoryManagement;
