// SearchBar.tsx
import React from "react";
import { Input } from "antd";

const { Search } = Input;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Search
        enterButton
        placeholder="Search by user name or email"
        onSearch={onSearch}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBar;
