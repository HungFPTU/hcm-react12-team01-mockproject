import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface SearchLessonProps {
  onSearch: (value: string) => void;
}

const SearchLesson = ({ onSearch }: SearchLessonProps): JSX.Element => {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <Search
        placeholder="Tìm kiếm bài học..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={handleSearch}
        className="w-full max-w-md"
      />
    </div>
  );
};

export default SearchLesson;
