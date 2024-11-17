import React from "react";
import { Input } from "antd";

const { Search } = Input;
// const { Option } = Select;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // const [searchType, setSearchType] = useState("");

  // const handleTypeChange = (value: string) => {
  //   setSearchType(value);
  // };

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      {/* <Select
        defaultValue=""
        style={{ width: 150, marginRight: 8 }}
        onChange={handleTypeChange}
      >
        <Option value="">--Choose Status--</Option>
        <Option value="new">New</Option>
        <Option value="request_paid">Request Paid</Option>
        <Option value="completed">Completed</Option>
      </Select> */}
      <Search
        enterButton
        // placeholder={`Search by ${searchType.toLowerCase()} name`}
        onSearch={(value) => onSearch(value)}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBar;
