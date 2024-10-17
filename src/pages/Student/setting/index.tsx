import React, { useState } from "react";
import SettingTabs from "../../../components/StudentComponents/setting/tab";
import ChangePasswordPage from "./change-password";
import InstructionReuqestPage from "./instructor-request";
import ProfilePage from "./profile";

const SettingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="p-8 mt-5">
      <SettingTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === "1" && <ProfilePage />}
      {activeTab === "2" && <ChangePasswordPage />}
      {activeTab === "3" && <InstructionReuqestPage />}
    </div>
  );
};

export default SettingPage;
