import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../../services/auth.service";
import ProfileForm from "./form/ProfileForm";
import { notification } from "antd";
import { User } from "../../../../model/User.tsx";

const SettingProfile = () => {
    const [user, setUser] = useState<User | null>(null); // State lưu thông tin người dùng
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // State lưu avatar URL
    const [loading, setLoading] = useState<boolean>(true); // State quản lý loading

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getCurrentUser(); // Gọi API lấy thông tin người dùng
                setUser(userData);
                setAvatarUrl(userData.avatar_url || ""); // Thiết lập avatar ban đầu
            } catch (error) {
                notification.error({ message: "Failed to load user data" });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>No user data available</div>;

    return (
        <div className="p-8">
            <ProfileForm user={{ ...user, avatar_url: avatarUrl }} />
        </div>
    );
};

export default SettingProfile;
