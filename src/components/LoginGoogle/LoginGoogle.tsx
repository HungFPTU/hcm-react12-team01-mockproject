// src/components/LoginGoogle.jsx
import { useCallback } from 'react';
import { message } from 'antd';
import { signInWithGoogle } from '../../firebase-config';
import GOOGLE_ICON from '../../assets/LOGOGOOGLE.png';
import { useNavigate } from 'react-router-dom';

const LoginGoogle = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      if (user) {
        const idToken = await user.getIdToken();
        sessionStorage.setItem('Token', idToken);
        message.success("Login successful!");
        navigate('/');
      }
    } catch (error) {
      console.error("Google Sign In Failed:", error);
      message.error("Login failed. Please try again.");
    }
  }, [navigate]);

  return (
    <div 
      className='w-full text-black my-2 font-semibold bg-white border border-black/40 border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-6'
      onClick={handleGoogleSignIn} 
    >
      <img src={GOOGLE_ICON} className="h-6 mr-3" alt="Google icon" />
      Login with Google
    </div>
  );
};

export default LoginGoogle;
