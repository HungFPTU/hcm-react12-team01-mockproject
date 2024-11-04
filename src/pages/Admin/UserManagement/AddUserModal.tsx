/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

const AddUserModal = ({
  isModalVisible,
  handleCancel,
  handleFormSubmit,
}: any) => {
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
            { required: true, message: "Vui lòng nhập tên!" },
            {
              pattern: /^[a-zA-Z0-9 ]+$/,
              message: "Tên không được chứa ký tự đặc biệt!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
        >
          <Select onChange={handleRoleChange} placeholder="Chọn vai trò">
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
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                {
                  pattern: /^0\d{9}$/,
                  message: "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Avatar URL"
              name="avatar_url"
              rules={[
                { required: true, message: "Vui lòng nhập URL ảnh đại diện!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Video URL"
              name="video_url"
              rules={[{ required: true, message: "Vui lòng nhập URL video!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bank Name"
              name="bank_name"
              rules={[
                { required: true, message: "Vui lòng nhập tên ngân hàng!" },
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
                  message: "Vui lòng nhập số tài khoản ngân hàng!",
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
                  message: "Vui lòng nhập tên tài khoản ngân hàng!",
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
