import { toast } from 'react-toastify';

export const handleErrorByToast = (error: any) => {
  const message = error.response?.data?.message || error.message;
  toast.error(message);
  return null;
};
