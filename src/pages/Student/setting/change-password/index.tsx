import React from "react";
import ChangePassword from "../../../../components/StudentComponents/setting/change-password";

const ChangePasswordPage: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">Change Password</h2>
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
