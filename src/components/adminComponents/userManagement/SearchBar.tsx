import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchBar = ({ handleSearch, handleAddUser }: any) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ float: "right", backgroundColor: "green" }}
        onClick={handleAddUser}
      >
        Add User
      </Button>
      <Search
        enterButton
        placeholder="Search by name or email"
        onSearch={handleSearch}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBar;
