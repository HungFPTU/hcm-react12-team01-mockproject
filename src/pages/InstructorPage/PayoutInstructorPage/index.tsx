import { Tabs } from "antd";
import type { TabsProps } from "antd";
import RequestPayoutTable from "../../../components/InstructorComponents/PayoutComponent/RequestPayoutTable";
import CompletedPayoutTable from "../../../components/InstructorComponents/PayoutComponent/CompletedPayoutTable";
import PayoutTable from "../../../components/InstructorComponents/PayoutComponent/PayoutComponet";
import RejectedPayoutTable from "../../../components/InstructorComponents/PayoutComponent/RejectedPayout";

const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Request payout",
        children: <PayoutTable />,
    },
    {
        key: "2",
        label: "Request payout",
        children: <RequestPayoutTable />,
    },
    {
        key: "3",
        label: "Completed",
        children: <CompletedPayoutTable />,
    },
    {
        key: "4",
        label: "Rejected",
        children: <RejectedPayoutTable />,
    }
];
const PayoutInstructorPage = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <>

            <div className="flex justify-between items-center">

                <div>
                    {/* <SearchSales onSearch={() => { }} /> */}
                </div>
                <div>
                    {/* <ButtonSales /> */}
                </div>
            </div>
            <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>

        </>

    );
}

export default PayoutInstructorPage;