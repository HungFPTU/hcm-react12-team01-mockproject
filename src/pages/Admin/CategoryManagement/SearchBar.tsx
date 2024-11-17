import React, { useState } from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

interface SearchBarProps {
  onSearch: (value: string, type: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState<string | undefined>(undefined);

  const handleTypeChange = (value: string) => {
    setSearchType(value);
  };

  const handleSearch = (value: string) => {
    onSearch(value, searchType || "Sub Category"); // Pass current searchType directly
  };

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <Select
        placeholder="Select Category Type"
        style={{ width: 150, marginRight: 8 }}
        onChange={handleTypeChange}
        value={searchType}
      >
        <Option value="Sub Category">Sub Category</Option>
        <Option value="Parent Category">Parent Category</Option>
      </Select>
      <Search
        enterButton
        placeholder={`Search by ${searchType ? searchType.toLowerCase() : "category"} name`}
        onSearch={handleSearch} // Use the handleSearch function here
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBar;
