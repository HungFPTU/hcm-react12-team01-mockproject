import React from "react";
import AvatarUpload from "./avatar/AvatarUpload";
import ProfileForm from "./form/ProfileForm";

const SettingProfile: React.FC = () => {
  return (
    <div className="p-8">
      <AvatarUpload />
      <ProfileForm />
    </div>
  );
};

export default SettingProfile;
