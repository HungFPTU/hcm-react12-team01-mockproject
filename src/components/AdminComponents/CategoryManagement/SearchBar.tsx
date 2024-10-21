import React from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <Select
        defaultValue="Sub Category"
        style={{ width: 150, marginRight: 8 }}
      >
        <Option value="Sub Category">Sub Category</Option>
        <Option value="Parent Category">Parent Category</Option>
      </Select>
      <Search
        enterButton
        placeholder="Search by category name"
        onSearch={onSearch}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBar;
