// src/pages/Login.jsx
import LoginGoogle from '../../components/loginGoogle/LoginGoogle';
import LoginEmailPassword from '../../components/loginEmailPassword/LoginEmailPassword';
import YOUR_IMAGE from '../../assets/Login&Register.jpg';
import LOGO from '../../assets/LogoCourseApp.png';
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const navigate = useNavigate();  

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#330933] to-white-600 relative">
      <div className='flex w-full max-w-[1200px] shadow-2xl'>
        <div className='hidden md:flex w-1/2 shadow-2xl'>
          <img src={YOUR_IMAGE} alt="Description of image" className="w-full h-full object-cover shadow-xl rounded-l-lg " />
        </div>

        <div className='w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl'>
          <h1 className='text-3xl text-black font-semibold mb-4 flex items-center'>
            <img src={LOGO} alt="Logo" className="h-9 mr-3" />
            F-Learning
          </h1>
          <div className='w-full flex flex-col mb-4'>
            <h3 className='text-xl font-semibold mb-2'>Hello Friends</h3>
            <p className='text-base mb-2'>Please! Login with your account</p>
          </div>

          <LoginEmailPassword />
          <LoginGoogle />

          <div className='w-full flex items-center justify-center'>
            <p className='text-sm font-normal text-black mt-8'>
              Don't have an account? 
              <span 
                className='font-semibold underline underline-offset-2 cursor-pointer' 
                onClick={() => navigate('/register')}  
              > Register</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
