import { Layout, Input, Space, Button } from "antd";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

export default function Home() {
  const navigate = useNavigate();
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          width: "100%",
          height: "66px",
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          borderBottom: "1px solid #e8ebed",
          backgroundColor: "#fff",
          fontSize: "1.4rem",
        }}
        className="flex flex-col md:flex-row justify-between items-center"
      >
        {/* Left */}
        <div className="left flex items-center space-x-4 ml-2 md:ml-5">
          <img
            src={assets.logo}
            className="logo h-8 w-auto md:h-12 cursor-pointer"
            alt="Logo"
          />
          <p className="subTitle text-lg md:text-2xl font-bold text-black ml-2">FLearning</p>
        </div>

        {/* Search */}
        <div className="search flex-grow flex justify-center mx-2 mt-7 md:mx-4">
          <Space direction="vertical">
            <Search
              placeholder="Search"
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              style={{
                width: "100%",
              }}
              className="w-full md:w-[700px]"
            />
          </Space>
        </div>

        {/* Right */}
        <div className="right flex items-center justify-end flex-shrink-0 ml-auto mt-2 md:mt-0">
          <Button onClick={() => navigate("/login")} type="text" className="register mr-3 md:mr-7 bg-transparent font-semibold cursor-pointer">
            Register
          </Button>
          <Button onClick={() => navigate("/login")} className="login flex-shrink-0 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-white bg-gradient-to-br from-[#d01bc7] to-[#ff5117] text-sm md:text-lg font-semibold cursor-pointer transition-opacity duration-200">
            Login
          </Button>
        </div>
      </Header>
    </Layout>
  );
}
