import { useState } from "react";
import SettingTabs from "../../../components/StudentComponents/setting/tab";
import ChangePasswordPage from "./change-password";
import ProfilePage from "./profile";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="p-8 mt-5">
      <SettingTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === "1" && <ProfilePage />}
      {activeTab === "2" && <ChangePasswordPage />}
    </div>
  );
};

export default SettingPage;
