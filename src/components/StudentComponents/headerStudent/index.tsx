import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Input, Layout, Space } from "antd";
import { useNavigate } from "react-router-dom";
import assets from "../../../assets/assets";
import "./index.css"; // Import your CSS

const { Header } = Layout;
const { Search } = Input;

export default function HeaderStudent() {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    console.log(value);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const userMenuItems = [
    { key: "1", label: "Profile", onClick: () => navigate("/profile") },
    { key: "2", label: "Logout", onClick: () => navigate("/logout") },
  ];

  return (
    <Layout>
      <Header className="header-student-header">
        {/* Left: Logo and Title */}
        <div className="left flex items-center">
          <button
            onClick={() => navigate("/")}
            className="header-student-logo-button"
            aria-label="Go to Home"
          >
            <img src={assets.logo} className="header-student-logo" alt="Logo" />
          </button>
          <p className="header-student-title">FLearning</p>
        </div>

        {/* Search Box */}
        <div className="header-student-search-container">
          <Space direction="vertical">
            <Search
              placeholder="Search"
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              className="header-student-search"
            />
          </Space>
        </div>

        {/* Right: Cart and Avatar */}
        <div className="header-student-right">
          <Badge count={2} showZero>
            <Button
              icon={<ShoppingCartOutlined className="header-student-cart" />}
              type="text"
              onClick={handleCartClick}
            />
          </Badge>

          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Avatar
              size={40}
              icon={<UserOutlined />}
              className="header-student-avatar"
            />
          </Dropdown>
        </div>
      </Header>
    </Layout>
  );
}
