import React, { useState } from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

interface SearchBarProps {
  onSearch: (value: string, type: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("Sub Category");

  const handleTypeChange = (value: string) => {
    setSearchType(value);
  };

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <Select
        defaultValue="Sub Category"
        style={{ width: 150, marginRight: 8 }}
        onChange={handleTypeChange}
      >
        <Option value="Sub Category">Sub Category</Option>
        <Option value="Parent Category">Parent Category</Option>
      </Select>
      <Search
        enterButton
        placeholder={`Search by ${searchType.toLowerCase()} name`}
        onSearch={(value) => onSearch(value, searchType)}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBar;
