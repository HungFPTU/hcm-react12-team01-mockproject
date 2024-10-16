import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import { AnyObject } from "antd/es/_util/type";
import React, { useState } from "react";

const SettingProfile: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState<string>("");

  const handleUploadChange = (info: AnyObject) => {
    if (info.file.status === "done") {
      // Giả định tải lên thành công và đặt URL cho avatar
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
  };

  const handlePreviewAvatar = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleSaveChanges = () => {
    // Implement your save functionality here
    console.log("Profile updated with description:", description);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-center">
        <div className="relative">
          {avatarUrl ? (
            <>
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover"
                onClick={handlePreviewAvatar}
              />
              <div className="absolute top-0 right-0 flex space-x-2">
                <Button
                  icon={<EyeOutlined />}
                  shape="circle"
                  onClick={handlePreviewAvatar}
                />
                <Button
                  icon={<DeleteOutlined />}
                  shape="circle"
                  onClick={handleRemoveAvatar}
                  danger
                />
              </div>
            </>
          ) : (
            <Upload
              showUploadList={false}
              onChange={handleUploadChange}
              accept="image/*"
            >
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border border-dashed cursor-pointer">
                <PlusOutlined />
                <div>Upload</div>
              </div>
            </Upload>
          )}
        </div>
      </div>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleModalCancel}
      >
        {avatarUrl && (
          <img src={avatarUrl} alt="Avatar Preview" className="w-full" />
        )}
      </Modal>

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
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please enter your date of birth" },
          ]}
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
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
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
    </div>
  );
};

export default SettingProfile;
