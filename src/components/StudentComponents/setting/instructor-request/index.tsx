import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import React from "react";
import { AnyObject } from "yup";

const { Option } = Select;

const InstructorRequestForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: AnyObject) => {
    console.log("Form values:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="p-8 bg-white rounded-lg shadow-md"
    >
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input type="email" placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input placeholder="Enter your phone number" />
      </Form.Item>

      <Form.Item
        name="dob"
        label="Date of Birth"
        rules={[
          { required: true, message: "Please select your date of birth" },
        ]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="qualification"
        label="Qualification"
        rules={[
          { required: true, message: "Please select your qualification" },
        ]}
      >
        <Select placeholder="Select your qualification">
          <Option value="bachelors">Bachelors</Option>
          <Option value="masters">Masters</Option>
          <Option value="phd">PhD</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="resume"
        label="Upload Resume"
        rules={[{ required: true, message: "Please upload your resume" }]}
      >
        <Upload name="resume" action="/upload" listType="text">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Request
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InstructorRequestForm;
