import React, { useState } from 'react';
import { Table, Tag, Divider, Radio, Button, } from 'antd';
import type { TableProps } from 'antd';
// import type { TableProps } from 'antd';
const { Column } = Table;
interface DataType {
    key: string;
    payoutNo: string;
    date: string;
    payoutAmount: number;
    statuss: string[];
}

const data: DataType[] = [
    {
        key: '1',
        payoutNo: "PAYOUT_0001",
        date: "12/1/2024 12:01:00AM",
        payoutAmount: 100,
        statuss: ['new'],
    },
    {
        key: '2',
        payoutNo: "PAYOUT_0002",
        date: "12/1/2024 12:01:00AM",
        payoutAmount: 200,
        statuss: ['inProgress'],
    },
    {
        key: '3',
        payoutNo: "PAYOUT_0003",
        date: "12/1/2024 12:01:00AM",
        payoutAmount: 300,
        statuss: ['rejected'],
    },
    {
        key: '4',
        payoutNo: "PAYOUT_0004",
        date: "12/1/2024 12:01:00AM",
        payoutAmount: 400,
        statuss: ['completed'],
    },
];

const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.statuss.includes('completed'),
        name: `payout-${record.key}`,
    }),
};
const DashboardTable: React.FC = () => {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    return (
        <>
            <Radio.Group onChange={(e) => setSelectionType(e.target.value)} value={selectionType}>
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio>
            </Radio.Group>
            <Divider />
            <Table<DataType>
                rowSelection={{ type: selectionType, ...rowSelection }}
                dataSource={data}>
                <Column title="Payout No" dataIndex="payoutNo" key="payoutNo" />
                <Column title="Date" dataIndex="date" key="date" />
                <Column title="Payout Amount" dataIndex="payoutAmount" key="payoutAmount" />

                <Column
                    title="Status"
                    dataIndex="statuss"
                    key="statuss"
                    render={(statuss: string[]) => (
                        <>
                            {statuss.map((status) => {
                                let color = 'green';
                                if (status === 'new') {
                                    color = 'blue';
                                } else if (status === 'inProgress') {
                                    color = 'yellow';
                                } else if (status === 'rejected') {
                                    color = 'volcano';
                                }
                                return (
                                    <Tag color={color} key={status}>
                                        {status.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={(_: unknown, _record: DataType) => (
                        <Button size="middle">
                            Send request payout
                        </Button>
                    )}
                />
            </Table>
        </>

    );
}

export default DashboardTable;