import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, notification } from "antd";
import { useState} from "react";

interface AvatarUploadProps {
    initialAvatar: string; // Nhận avatar từ API
    onAvatarChange: (url: string) => void; // Callback khi avatar thay đổi
}

const AvatarUpload = ({ initialAvatar, onAvatarChange }: AvatarUploadProps) => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatar);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleUploadChange = (info: any) => {
        if (info.file.status === "done") {
            const url = URL.createObjectURL(info.file.originFileObj);
            setAvatarUrl(url);
            onAvatarChange(url); // Cập nhật avatar mới
            notification.success({ message: "Avatar uploaded successfully!" });
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarUrl(null);
        onAvatarChange(""); // Xóa avatar
    };

    return (
        <div className="mb-8 flex justify-center">
            <div className="relative">
                {avatarUrl ? (
                    <>
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="absolute top-0 right-0 flex space-x-2">
                            <Button icon={<EyeOutlined />} shape="circle" onClick={() => setIsModalVisible(true)} />
                            <Button icon={<DeleteOutlined />} shape="circle" onClick={handleRemoveAvatar} danger />
                        </div>
                    </>
                ) : (
                    <Upload showUploadList={false} onChange={handleUploadChange} accept="image/*">
                        <div className="w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer">
                            <PlusOutlined className="text-2xl" />
                        </div>
                        <div className="text-center mt-2">Upload Avatar</div>
                    </Upload>
                )}
            </div>

            <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                {avatarUrl && <img src={avatarUrl} alt="Avatar Preview" className="w-full" />}
            </Modal>
        </div>
    );
};

export default AvatarUpload;
