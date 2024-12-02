import { Modal, Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

const AddUserModal = ({isModalVisible,handleCancel,handleFormSubmit,}: any) => {
  const [form] = Form.useForm();
  const [role, setRole] = useState<string | undefined>(undefined);

  const handleRoleChange = (value: string) => {
    setRole(value); // Cập nhật trạng thái vai trò
  };

  // Cập nhật lại form mỗi khi vai trò thay đổi
  useEffect(() => {
    form.setFieldsValue({ role });
  }, [role, form]);

  return (
    <Modal
      title="Create New Account"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={600} // Có thể điều chỉnh chiều rộng của modal
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter name!" },
            {
              pattern: /^[a-zA-Z0-9 ]+$/,
              message: "Name isn't special character!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email!" },
            { type: "email", message: "Email invalid!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please enter role!" }]}
        >
          <Select onChange={handleRoleChange} placeholder="Chosen role">
            <Option value="admin">Admin</Option>
            <Option value="instructor">Instructor</Option>
            <Option value="student">Student</Option>
          </Select>
        </Form.Item>

        {/* Các trường thông tin cho Instructor */}
        {role === "instructor" && (
          <>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                {
                  pattern: /^0\d{9}$/,
                  message: "Phone number must start with 0 and have 10 digits!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Avatar URL"
              name="avatar_url"
              rules={[
                { required: true, message: "Please enter avatar URL!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Video URL"
              name="video_url"
              rules={[{ required: true, message: "Please enter video URL!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bank Name"
              name="bank_name"
              rules={[
                { required: true, message: "Please enter bank name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bank Account No."
              name="bank_account_no"
              rules={[
                {
                  required: true,
                  message: "Please enter bank account number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bank Account Name"
              name="bank_account_name"
              rules={[
                {
                  required: true,
                  message: "Please enter bank account name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
