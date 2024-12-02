import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CompletedPayoutTable from "./CompletedPayout";
import RequestPayout from "./RequestPayout";
import RejectedPayoutTable from "./RejectedPayout";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Request payout",
    children: <RequestPayout />,
  },
  {
    key: "2",
    label: "Completed",
    children: <CompletedPayoutTable />,
  },
  {
    key: "3",
    label: "Rejected",
    children: <RejectedPayoutTable />,
  },
];
const PayoutInstructorPage = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>

  );
}

export default PayoutInstructorPage;