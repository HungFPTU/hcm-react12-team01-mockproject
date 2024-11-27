import { Input, Modal } from "antd";
import { useState } from "react";

interface AvatarUploadProps {
  initialAvatar: string; // Nhận avatar từ API
  onAvatarChange: (url: string) => void; // Callback khi avatar thay đổi
}

const AvatarUpload = ({ initialAvatar, onAvatarChange }: AvatarUploadProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatar);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarUrl(e.target.value);
    onAvatarChange(e.target.value);
  };

  return (
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

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {avatarUrl && (
          <img src={avatarUrl} alt="Avatar Preview" className="w-full" />
        )}
      </Modal>
    </div>
  );
};

export default AvatarUpload;
