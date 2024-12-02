import React from "react";
import { Input } from "antd";

const { Search } = Input;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <Search
        enterButton
        onSearch={(value) => onSearch(value)}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBar;
