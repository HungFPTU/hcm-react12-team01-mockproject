import { useEffect, useState } from "react";

import ProfileForm from "./form/ProfileForm";
import { notification } from "antd";
import { User, UpdateUser } from "../../../../model/User";
import { UserService } from "../../../../services/UserService/UserService";

const SettingProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchUserData = async () => {
    try {
      const response = await UserService.getUserById(userInfo._id);
      const userData = response.data.data; // Assuming the user data is in the 'data' property
      setUser(userData);
      setAvatarUrl(userData.avatar_url || "");
    } catch (error) {
      notification.error({ message: `Failed to load user data: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async (updatedData: UpdateUser) => {
    try {
      if (user) {
        await UserService.updateUser(userInfo._id, {
          ...updatedData,
          avatar_url: avatarUrl,
        });
        notification.success({ message: "Profile updated successfully!" });

        // Fetch updated user data
        await fetchUserData();
      }
    } catch (error) {
      notification.error({ message: "Error updating profile" });
      console.error("Update error:", error);
    }
  };

  console.log("user", user);
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="p-8">
      <ProfileForm
        user={{ ...user, avatar_url: avatarUrl }}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default SettingProfile;
