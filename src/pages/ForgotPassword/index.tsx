// src/pages/ForgotPassword/index.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";
import LOGO from "../../assets/LogoCourseApp.png";
import YOUR_IMAGE from "../../assets/Login&Register.jpg";
import { AuthService } from "../../services/authService/AuthService";

// Xác định kiểu của form values
interface FormValues {
  email: string;
}

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // State để kiểm soát trạng thái loading
  const navigate = useNavigate();
  const [form] = useForm();

  // Xác định kiểu cho values
  const onFinish = async (values: FormValues) => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      await AuthService.forgotPassword(values.email); // Gọi hàm forgotPassword với email đầu vào
      setSubmitted(true);
      message.success("Reset password link has been sent to your email");
    } catch (error) {
      // Ép kiểu cho error
      const typedError = error as any;
      message.error("Error sending reset link");
      console.error(
        typedError.response
          ? typedError.response.data.error
          : typedError.message
      );
      form.resetFields();
    } finally {
      setLoading(false); // Dừng trạng thái loading sau khi hoàn thành
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#330933] to-white-600 relative">
      <div className="flex w-full max-w-[1200px] shadow-2xl">
        <div className="hidden md:flex w-1/2 shadow-2xl">
          <img
            src={YOUR_IMAGE}
            alt="Forgot Password"
            className="w-full h-full object-cover shadow-xl rounded-l-lg"
          />
        </div>

        <div className="w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl">
          <h1 className="text-3xl text-black font-semibold mb-4 flex items-center">
            <img src={LOGO} alt="Logo" className="h-9 mr-3" />
            F-Learning
          </h1>

          {!submitted ? (
            <Form
              onFinish={onFinish}
              form={form}
              name="forgotPasswordForm"
              layout="vertical"
              autoComplete="off"
            >
              <h2 className="text-xl font-semibold mb-2">
                Reset your password
              </h2>
              <p className="text-base mb-4">
                Please enter your email address. You will receive a secure link
                to reset your password.
              </p>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    className="w-full my-2 font-semibold bg-[#a928c3]"
                    htmlType="submit"
                    style={{ width: "520px" }}
                    loading={loading} // Gán trạng thái loading
                    disabled={loading} // Vô hiệu hóa khi đang loading
                  >
                    Submit
                  </Button>
                </Space>
              </Form.Item>
              <Form.Item>
                <Button type="link" onClick={() => navigate("/login")}>
                  Back to log in
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div
              className="request-submitted text-center"
              style={{ marginTop: 50 }}
            >
              <h2 className="text-xl font-semibold mb-2">Request submitted</h2>
              <p className="text-base mb-4">
                If an account exists for the provided email, you will receive an
                email with a secure link to reset your password. If you do not
                receive this email, check your spam folder or create an account.
              </p>
              <Button type="link" onClick={() => navigate("/login")}>
                Back to log in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
