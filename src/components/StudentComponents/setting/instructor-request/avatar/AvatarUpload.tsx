import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { useState } from "react";
import { AnyObject } from "yup";

const AvatarUpload = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUploadChange = (info: AnyObject) => {
    if (info.file.status === "done") {
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

  return (
    <div className="mb-8">
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
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
              <PlusOutlined className="text-2xl" />
            </div>
            <div className="text-center mt-2">Upload Avatar</div>
          </Upload>
        )}
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
    </div>
  );
};

export default AvatarUpload;
