import { Layout, Dropdown, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { AuthService } from "../../services/authService/auth.service";
import { useAuth } from "../../context/AuthContent";    

const { Header } = Layout;

export default function Home() {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const handleLogOut = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("userInfo");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const userMenuItems = [
    { key: "1", label: "Logout", onClick: handleLogOut }, 
  ];

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-10">
          {/* Logo Section */}
          <div
            className="flex items-center cursor-pointer space-x-2"
            onClick={() => navigate("/")}
          >
            <img src={assets.logo} className="h-8 w-auto md:h-10" alt="Logo" />
            <p className="text-lg md:text-2xl font-bold text-black ml-2">
              FLearning
            </p>
          </div>

          {/* User Info / Auth Buttons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {userInfo ? (
              <>
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomLeft"
                  overlayStyle={{ padding: "8px", borderRadius: "8px" }}
                >
                  <Avatar
                    size={40}
                    src={userInfo.avatar_url || null}
                    icon={!userInfo.avatar_url && <UserOutlined />}
                    style={{ cursor: "pointer", border: "2px solid #d01bc7" }}
                  />
                </Dropdown>
                <span className="font-semibold text-gray-700">
                  Welcome, {userInfo?.name || "Admin"}
                </span>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/register")}
                  type="text"
                  className="font-semibold text-gray-700 hover:text-black"
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1 rounded-full bg-gradient-to-br from-[#d01bc7] to-[#ff5117] text-white hover:from-[#ff5117] hover:to-[#d01bc7] transition-all"
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
