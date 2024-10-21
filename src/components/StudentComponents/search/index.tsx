import { Input } from "antd";
import "./index.css";

const { Search } = Input;

interface SearchComponentProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchComponent = ({
  placeholder,
  onSearch,
}: SearchComponentProps) => {
  return (
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      enterButton={
        <div className="search-button">
          <span role="img" aria-label="search" className="search-icon">
            🔍
          </span>
        </div>
      }
      size="large"
      className="custom-search"
    />
  );
};

export default SearchComponent;
