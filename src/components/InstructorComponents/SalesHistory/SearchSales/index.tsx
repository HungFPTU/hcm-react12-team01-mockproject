import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface SearchSalesProps {
  onSearch: (value: string) => void;
}

const SearchSales = ({ onSearch }: SearchSalesProps): JSX.Element => {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <Search
        placeholder="Tìm kiếm hóa đơn..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={handleSearch}
        className="w-full max-w-md"
      />
    </div>
  );
};

export default SearchSales;
