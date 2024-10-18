import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface SearchReviewProps {
  onSearch: (value: string) => void;
}

const SearchReview = ({ onSearch }: SearchReviewProps): JSX.Element => {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <Search
        placeholder="Tìm kiếm đánh giá..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={handleSearch}
        className="w-full max-w-md"
      />
    </div>
  );
};

export default SearchReview;
