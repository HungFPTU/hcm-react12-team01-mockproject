import { Button, Form, Input, notification } from "antd";
import { ChangePasswordUser } from "../../../../model/User"; // Nhập interface ChangePasswordUser
import { UserService } from "../../../../services/UserService/UserService";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: ChangePasswordUser) => {
    const { old_password, new_password } = values; // Sử dụng old_password và new_password
    const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;

    // Tạo dữ liệu cho việc thay đổi mật khẩu
    const data: ChangePasswordUser = {
      user_id: userId,
      old_password: old_password, // Sử dụng old_password
      new_password: new_password, // Sử dụng new_password
    };

    try {
      await UserService.changePassword(data);
      notification.success({ message: "Password changed successfully!" });
      form.resetFields(); // Đặt lại các trường trong form
    } catch (error) {
      notification.error({ message: "Error changing password" });
      console.error("Change password error:", error);
    }
  };

  return (
    <div className="p-8">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Current Password"
          name="old_password" // Đổi thành old_password
          rules={[
            { required: true, message: "Please enter your current password" },
          ]}
        >
          <Input.Password placeholder="Enter your current password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="new_password" // Đổi thành new_password
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password placeholder="Enter your new password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={["new_password"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your new password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
