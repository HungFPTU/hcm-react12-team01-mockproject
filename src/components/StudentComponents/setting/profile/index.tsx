import { useEffect, useState } from "react";

import ProfileForm from "./form/ProfileForm";
import { notification } from "antd";
import { User, UpdateUser } from "../../../../model/User";
import { UserSettingService } from "../../../../services/SettingService/user-service";
import { getCurrentUser } from "../../../../services/auth.service";
const SettingProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchUserData = async () => {
    try {
      const response = await UserSettingService.getUserById(userInfo._id);
      const userData = response.data.data; // Assuming the user data is in the 'data' property
      setUser(userData);
      getCurrentUser();
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
        await UserSettingService.updateUser(userInfo._id, {
          ...updatedData,
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
      <ProfileForm user={{ ...user }} onUpdate={handleUpdate} />
    </div>
  );
};

export default SettingProfile;
