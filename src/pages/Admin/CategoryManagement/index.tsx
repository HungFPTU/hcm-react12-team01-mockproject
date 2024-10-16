import React, { useState } from "react";
import { Table, Button, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

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
        <>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record.key)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => handleDelete(record.key)}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: 20, color: "green" }}>Category Management</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <Select
            defaultValue="Sub Category"
            style={{ width: 150, marginRight: 8 }}
          >
            <Option value="Sub Category">Sub Category</Option>
            <Option value="Parent Category">Parent Category</Option>
          </Select>
          <Search
            placeholder="Search by category name"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCategory}
        >
          New Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredCategories}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CategoryManagement;
