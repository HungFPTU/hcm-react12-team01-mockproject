import { useState } from "react";
import SubscriptionTabs from "../../../components/StudentComponents/subsription/tabs";
import SubscribedPage from "./subscribed";
import SubscriberPage from "./subscriber";

const SubscriptionPage  = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="p-8 mt-5">
      <SubscriptionTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === "1" && <SubscribedPage />}
      {activeTab === "2" && <SubscriberPage />}
    </div>
  );
};

export default SubscriptionPage;
