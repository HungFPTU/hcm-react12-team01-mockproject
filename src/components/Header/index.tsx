import { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Button, Avatar, Badge } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { AuthService } from "../../services/authService/AuthService";

const { Header } = Layout;

const items = [
  { label: "HOME", key: "home" },
  {
    label: "COURSE",
    key: "courses",
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
  { label: "ABOUT", key: "about" },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Link
      </a>
    ),
    key: "link",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogOut = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const userMenuItems = [
    { key: "1", label: "Profile", onClick: () => navigate("/profile") },
    { key: "2", label: "Logout", onClick: handleLogOut },
    { key: "3", label: "DashBoard", onClick: () => navigate("/dashboard") },
  ];

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <div className="flex justify-between items-center px-4 md:px-8">
          <div
            className="left flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={assets.logo} className="h-8 w-auto md:h-10" alt="Logo" />
            <p className="text-lg md:text-2xl font-bold text-black ml-2">
              FLearning
            </p>
          </div>

          {isMobile ? (
            <Dropdown overlay={<Menu items={items} />} trigger={["click"]}>
              <Button icon={<MenuOutlined />} />
            </Dropdown>
          ) : (
            <Menu
              mode="horizontal"
              items={items}
              className="flex-grow flex justify-center"
              style={{ borderBottom: "none" }}
            />
          )}

          <div className="flex items-center space-x-2 md:space-x-4">
            {token ? (
              <>
                <Badge showZero>
                  <Button
                    icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
                    type="text"
                    onClick={() => navigate("/student/cart")}
                  />
                </Badge>
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                >
                  <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  type="text"
                  className="font-semibold text-gray-700"
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1 rounded-full bg-gradient-to-br from-[#d01bc7] to-[#ff5117] text-white"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </Header>
    </Layout>
  );
}
