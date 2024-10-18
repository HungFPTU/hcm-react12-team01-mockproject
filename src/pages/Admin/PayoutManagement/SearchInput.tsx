import React from "react";
import { Input } from "antd";

const { Search } = Input;

interface SearchInputProps {
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Search
        enterButton
        placeholder="Search by payout number"
        onSearch={onSearch}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchInput;
