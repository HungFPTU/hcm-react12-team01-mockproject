import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

interface SearchCourseProps {
  onSearch: (value: string) => void;
}

const SearchCourse = ({ onSearch }: SearchCourseProps): JSX.Element => {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <Search
        placeholder="Find course..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={handleSearch}
        className="w-full max-w-md"
      />
    </div>
  );
};

export default SearchCourse;
