import AvatarUpload from "./avatar/AvatarUpload";
import ProfileForm from "./form/ProfileForm";

const SettingProfile = () => {
  return (
    <div className="p-8">
      <AvatarUpload />
      <ProfileForm />
    </div>
  );
};

export default SettingProfile;
