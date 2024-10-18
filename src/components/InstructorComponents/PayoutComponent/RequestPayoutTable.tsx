import React, { useState } from 'react';
import { Table, Tag, Divider, Radio, } from 'antd';
import type { TableProps } from 'antd';
// import type { TableProps } from 'antd';
const { Column } = Table;
interface DataType {
    key: string;
    payoutNo: string;
    statuss: string[];
    date: string;
    transactionId: string;
    balanceOrigin: number;
    balanceInsPaid: number
    balanceReceived: number;
}

const data: DataType[] = [
    {
        key: '1',
        payoutNo: 'PO-123',
        statuss: ['new'],
        date: '2024-10-18',
        transactionId: 'TX-456',
        balanceOrigin: 1000,
        balanceInsPaid: 500,
        balanceReceived: 500,
    },
    {
        key: '2',
        payoutNo: 'PO-789',
        statuss: ['new'],
        date: '2024-10-17',
        transactionId: 'TX-111',
        balanceOrigin: 2000,
        balanceInsPaid: 200,
        balanceReceived: 1800,
    },
    {
        key: '3',
        payoutNo: 'PO-101',
        statuss: ['new'],
        date: '2024-10-16',
        transactionId: 'TX-222',
        balanceOrigin: 500,
        balanceInsPaid: 0,
        balanceReceived: 0,
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
const RequestPayoutTable: React.FC = () => {
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
                <Column title="Create At" dataIndex="date" key="date" />
                <Column title="Transaction Id" dataIndex="transactionId" key="transactionId" />
                <Column title="Balance Origin" dataIndex="balanceOrigin" key="balanceOrigin" />
                <Column title="Balance Instructor Paid" dataIndex="balanceInsPaid" key="balanceInsPaid" />
                <Column title="Balance Received" dataIndex="balanceReceived" key="balanceReceived" />
            </Table>
        </>

    );
}

export default RequestPayoutTable;