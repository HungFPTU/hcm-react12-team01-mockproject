import { Modal, Form, Input, Button, Select } from "antd";

const { Option } = Select;

const AddUserModal = ({
  isModalVisible,
  handleCancel,
  handleFormSubmit,
}: any) => {
  return (
    <Modal
      title="Create New Account"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleFormSubmit}>
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
          <Select>
            <Option value="Admin">Admin</Option>
            <Option value="Instructor">Instructor</Option>
            <Option value="Student">Student</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              pattern: /^0\d{9}$/,
              message: "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số!",
            },
          ]}
        >
          <Input />
        </Form.Item>

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
