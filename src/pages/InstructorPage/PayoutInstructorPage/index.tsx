import { Tabs } from "antd";
import type { TabsProps } from "antd";
import RequestPayoutTable from "../../../components/InstructorComponents/PayoutComponent/RequestPayoutTable";
import ButtonSales from "../../../components/InstructorComponents/SalesHistory/ButtonSales";
import SearchSales from "../../../components/InstructorComponents/SalesHistory/SearchSales";
import CompletedPayoutTable from "../../../components/InstructorComponents/PayoutComponent/CompletedPayoutTable";

const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Request payout",
        children: <RequestPayoutTable />,
    },
    {
        key: "2",
        label: "Completed",
        children: <CompletedPayoutTable />,
    },
];
const PayoutInstructorPage = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <>

            <div className="flex justify-between items-center">

                <div>
                    <SearchSales onSearch={() => { }} />
                </div>
                <div>
                    <ButtonSales />
                </div>
            </div>
            <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>

        </>

    );
}

export default PayoutInstructorPage;