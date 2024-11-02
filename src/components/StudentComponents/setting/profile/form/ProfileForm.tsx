import { Editor } from "@tinymce/tinymce-react";
import { Button, DatePicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UpdateUser, User } from "../../../../../model/User";
import AvatarUpload from "../avatar/AvatarUpload";
import moment from "moment";

interface ProfileFormProps {
  user: User;
  onUpdate: (data: UpdateUser) => Promise<void>;
}

const ProfileForm = ({ user, onUpdate }: ProfileFormProps) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState<string>(
    user.description || ""
  );
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar_url);

  useEffect(() => {
    form.setFieldsValue({
      email: user.email,
      name: user.name,
      phone_number: user.phone_number,
      dob: moment(user.dob),
      description: user.description,
      video_url: user.video_url,
      bank_name: user.bank_name,
      bank_account_no: user.bank_account_no,
      bank_account_name: user.bank_account_name,
    });
  }, [user, form]);

  const handleSaveChanges = async (values: UpdateUser) => {
    await onUpdate({
      email: values.email,
      name: values.name,
      phone_number: values.phone_number,
      dob: values.dob,
      description: description,
      avatar_url: avatarUrl,
      video_url: values.video_url,
      bank_name: values.bank_name,
      bank_account_no: values.bank_account_no,
      bank_account_name: values.bank_account_name,
    });
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSaveChanges}>
      <AvatarUpload
        initialAvatar={avatarUrl || ""}
        onAvatarChange={setAvatarUrl}
      />

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

      <Form.Item label="Phone Number" name="phone_number">
        <Input />
      </Form.Item>

      <Form.Item label="Date of Birth" name="dob">
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Editor
          value={description}
          onEditorChange={(content) => setDescription(content)}
          init={{
            height: 300,
            menubar: true,
            plugins:
              "advlist autolink lists link image charmap print preview anchor",
            toolbar:
              "undo redo | formatselect | bold italic backcolor | bullist numlist outdent indent",
          }}
        />
      </Form.Item>

      <Form.Item label="Video URL" name="video_url">
        <Input />
      </Form.Item>

      <Form.Item label="Bank Name" name="bank_name">
        <Input />
      </Form.Item>

      <Form.Item label="Bank Account Number" name="bank_account_no">
        <Input />
      </Form.Item>

      <Form.Item label="Bank Account Name" name="bank_account_name">
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
