import React from "react";
import SettingProfile from "../../../../components/StudentComponents/setting/profile";

const ProfilePage: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">Basic Profile</h2>
      <p className="text-gray-600 mb-6">Add information about yourself</p>
      <SettingProfile />
    </div>
  );
};

export default ProfilePage;
