import { Editor } from "@tinymce/tinymce-react";
import { Button, DatePicker, Form, Input } from "antd";
import React, { useState } from "react";

const ProfileForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");

  const handleSaveChanges = () => {
    // Implement your save functionality here
    console.log("Profile updated with description:", description);
  };

  return (
    <Form layout="vertical">
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input placeholder="Enter your phone number" />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        rules={[{ required: true, message: "Please enter your date of birth" }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Editor
          value={description}
          init={{
            height: 300,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={(content) => setDescription(content)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
