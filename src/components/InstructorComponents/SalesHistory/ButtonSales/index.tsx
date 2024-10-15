import { Button, message } from 'antd';


const ButtonSales = () => {

  const handleRequestApproval = () => {
    console.log('Gửi yêu cầu duyệt khóa học');
    message.success('Đã gửi yêu cầu duyệt khóa học lên admin');
  };

  return (
    <>
      <Button onClick={handleRequestApproval} type="primary">Send Request</Button>
    </>
  );
};

export default ButtonSales;
