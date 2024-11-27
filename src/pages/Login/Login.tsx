import LoginGoogle from '../../components/LoginGoogle/LoginGoogle';
import LoginEmailPassword from '../../components/LoginEmailPassword/LoginEmailPassword';
import YOUR_IMAGE from '../../assets/Login&Register.jpg';
import LOGO from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Login = () => {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#330933] to-white-600 relative">
      <div className="flex w-full max-w-[1200px] shadow-2xl">
        <div className="hidden md:flex w-1/2 shadow-2xl">
          <img
            src={YOUR_IMAGE}
            alt="Description of image"
            className="w-full h-full object-cover shadow-xl rounded-l-lg "
          />
        </div>

        <div className='w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl max-h-[600px] overflow-y-auto'>
          <h1 className="text-3xl text-black font-semibold mb-4 flex items-center">
            <img src={LOGO} alt="Logo" className="h-9 mr-3" />
            F-Learning
          </h1>
          <div className="w-full flex flex-col mb-4">
            <h3 className="text-xl font-semibold mb-2">Welcome! Hello Friends</h3>
            <p className="text-base mb-2">Please! Login with your account</p>
          </div>
          <div className="flex-grow">
            <LoginEmailPassword />
            <LoginGoogle />
          </div>

          <div className="w-full flex items-center justify-center mt-auto">
            <p className="text-sm font-normal text-black ">
              Don't have an account?
              <span
                className="font-semibold underline underline-offset-2 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                {" "}
                Register
              </span>
            </p>
          </div>
        </div>
      </div>


      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          className="flex items-center text-[#1f0a23] text-lg group"  
          onClick={handleBackHome}
        >
          <HomeOutlined
            className="mr-2 text-[#1f0a23] text-xl group-hover:text-[#7c3076]" 
          />
          <span className="group-hover:text-[#7c3076]">Back Home</span>  
        </button>
      </div>
    </div>
  );
};

export default Login;
