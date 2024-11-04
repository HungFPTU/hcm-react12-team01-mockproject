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
    <div style={{ padding: '20px' }}>
      <h2>Gửi lại Email Xác Thực</h2>
      <input
        type="email"
        placeholder="Nhập email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleResend} disabled={loading}>
        {loading ? 'Đang gửi...' : 'Gửi lại'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResendVerification;
