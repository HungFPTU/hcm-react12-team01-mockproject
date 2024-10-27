import { Button, Form, Input } from "antd";
import { AnyObject } from "yup";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: AnyObject) => {
    console.log("Password changed: ", values);
    // Add logic to handle password change, like calling an API.
  };

  return (
    <div className="p-8">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            { required: true, message: "Please enter your current password" },
          ]}
        >
          <Input.Password placeholder="Enter your current password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password placeholder="Enter your new password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
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
