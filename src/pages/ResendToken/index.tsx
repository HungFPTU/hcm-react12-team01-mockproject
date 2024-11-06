import { useState } from 'react';
import { AuthService } from '../../services/authService/AuthService';

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      setMessage('Vui lòng nhập email!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await AuthService.resendToken({ email });
      if (response.data) {
        setMessage('Email xác thực đã được gửi thành công!');
      }
    } catch {
      setMessage('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className='bg-gradient-to-r from-[#330933] to-[#f5f5f5] w-full min-h-screen flex justify-center items-center'>
    <div className='bg-white rounded-lg shadow-lg p-8 border border-gray-200 max-w-md w-full'>
      <h2 className='text-center text-2xl font-semibold text-[#330933] mb-6'>Gửi lại Email Xác Thực</h2>
      <div className='flex items-center'>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-rose-500 transition-all'
        />
        <button
          className={`ml-3 px-5 py-3 text-white font-medium rounded-lg transition-all ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'
          }`}
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Gửi Email'}
        </button>
      </div>
      {message && <p className='text-center text-rose-600 mt-4'>{message}</p>}
    </div>
  </div>
  



  );
};

export default ResendVerification;
