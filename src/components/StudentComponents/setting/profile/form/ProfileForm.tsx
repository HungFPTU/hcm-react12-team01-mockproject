import { Button, DatePicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UpdateUser, User } from "../../../../../model/User";
import moment from "moment";

interface ProfileFormProps {
  user: User;
  onUpdate: (data: UpdateUser) => Promise<void>;
}

const ProfileForm = ({ user, onUpdate }: ProfileFormProps) => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar_url);

  useEffect(() => {
    form.setFieldsValue({
      email: user.email,
      name: user.name,
      phone_number: user.phone_number,
      dob: moment(user.dob),
      description: user.description,
      video_url: user.video_url,
      avatarUrl: user.avatar_url,
      bank_name: user.bank_name,
      bank_account_no: user.bank_account_no,
      bank_account_name: user.bank_account_name,
    });
  }, [user, form]);

  const handleSaveChanges = async (values: UpdateUser) => {
    await onUpdate({
      email: values?.email,
      name: values?.name,
      phone_number: values?.phone_number,
      dob: values?.dob,
      description: values?.description,
      avatar_url: avatarUrl,
      video_url: values?.video_url,
      bank_name: values?.bank_name,
      bank_account_no: values?.bank_account_no,
      bank_account_name: values?.bank_account_name,
    });
  };

  const isInstructor = user.role === "instructor"; // Check user role
  const handleAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarUrl(e.target.value);
  };
  return (
    <Form layout="vertical" form={form} onFinish={handleSaveChanges}>
      {/* <AvatarUpload
        initialAvatar={avatarUrl || ""}
        onAvatarChange={setAvatarUrl}
      /> */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full">
          <Input
            placeholder="Enter image URL"
            value={avatarUrl || ""}
            onChange={handleAvatarUrlChange}
          />
          {avatarUrl && (
            <>
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover"
              />
            </>
          )}
        </div>
      </div>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone_number"
        rules={[
          { required: isInstructor, message: "Please enter your phone number" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[
          {
            required: isInstructor,
            message: "Please enter your Date of Birth",
          },
        ]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: isInstructor, message: "Please enter your description" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Video URL"
        name="video_url"
        rules={[
          { required: isInstructor, message: "Please enter your video URL" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Bank Name"
        name="bank_name"
        rules={[
          { required: isInstructor, message: "Please enter your bank name" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Bank Account Number"
        name="bank_account_no"
        rules={[
          {
            required: isInstructor,
            message: "Please enter your bank account number",
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
            required: isInstructor,
            message: "Please enter your bank account name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
