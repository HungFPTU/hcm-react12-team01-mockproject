import React, { useEffect, useRef, useState } from 'react';
import { Table, Popover, Empty, Modal, Button, } from 'antd';
import { Payout } from '../../../model/admin/response/Payout.response';
import { GetPayoutRequest } from '../../../model/admin/request/Payout.request';
import { PurchaseService } from '../../../services/PurchaseService/purchase.service';
import SearchBar from './SearchBar';
const CompletedPayoutTable: React.FC = () => {

    const hasMounted = useRef(false);
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDataEmpty, setIsDataEmpty] = useState(false); // Track if data is empty
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTransactions, setSelectedTransactions] = useState<any[]>([]);


    const showModal = (transactions: any[]) => {
        setSelectedTransactions(transactions);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };


    const fetchPayouts = async (params: GetPayoutRequest) => {
        try {
            const response = await PurchaseService.getPayout(params);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
            throw error;
        }
    };

    const fetchPurchaseData = async () => {
        try {
            const searchCondition = {
                payout_no: "",
                instructor_id: "",
                status: "completed",
                is_delete: false,
            };

            const response = await fetchPayouts({
                searchCondition,
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                },
            });

            if (response && response.success) {
                console.log("Fetched data:", response.data.pageData);
                const data = response.data.pageData;
                setPayouts(data);
                setIsDataEmpty(data.length === 0);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };


    useEffect(() => {
        if (hasMounted.current) return; // Trả về nếu đã mount
        hasMounted.current = true;
        fetchPurchaseData();
    }, [searchQuery]);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);


        const searchCondition = {
            payout_no: query,
            instructor_id: "",
            status: "completed",
            is_delete: false,
        };

        try {
            const response = await fetchPayouts({
                searchCondition,
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                },
            });

            if (response && response.success) {
                const data = response.data.pageData;
                setPayouts(data);
                setIsDataEmpty(data.length === 0);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };
    const columns = [
        {
            title: "Payout_No",
            dataIndex: "payout_no",
            key: "payout_no",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let statusText = "";
                let statusColor = "";
                let borderColor = "";
                let popoverContent = "";

                switch (status) {
                    case "new":
                        statusText = "New";
                        statusColor = "text-blue-500";
                        borderColor = "border-blue-500";
                        popoverContent = "You can send approval request to admin";
                        break;
                    case "request_paid":
                        statusText = " Request Paid";
                        statusColor = "text-orange-300";
                        borderColor = "border-orange-300";
                        popoverContent = "Please watting for the approval from admin";

                        break;
                    case "completed":
                        statusText = "Approved";
                        statusColor = "text-green-500";
                        borderColor = "border-green-500";
                        popoverContent =
                            "Your course has been approved, you can activate the course";

                        break;
                    case "rejected":
                        statusText = "Rejected";
                        statusColor = "text-red-500";
                        borderColor = "border-red-500";
                        popoverContent =
                            "Your course has been rejected, you can activate the course";

                        break;
                    default:
                        statusText = "Unknown";
                        statusColor = "text-gray-500";
                        borderColor = "border-gray-500";
                        popoverContent = "NO CAP!";

                        break;
                }

                return (
                    <Popover content={`${popoverContent}`}>
                        <span
                            className={`font-semibold ${statusColor} border-2 ${borderColor} px-2 py-1 rounded-md`}
                        >
                            {statusText}
                        </span>
                    </Popover>
                );
            },
        },
        {
            title: "Transactions",
            dataIndex: "transactions",
            key: "transactions",
            render: (transactions: any[]) => (
                <a onClick={() => showModal(transactions)}>
                    View {transactions.length} Transaction Details
                </a>
            ),
        },
        {
            title: "Balance origin",
            dataIndex: "balance_origin",
            key: "balance_origin",
            render: (balance_origin: number) => (
                <div className="text-right">{balance_origin.toLocaleString()} VND</div>
            ),
        },
        {
            title: "Balance instructor paid",
            dataIndex: "balance_instructor_paid",
            key: "balance_instructor_paid",
            render: (balance_instructor_paid: number) => (
                <div className="text-right">{balance_instructor_paid}VND</div>
            ),
        },
        {
            title: "Balance instructor received",
            dataIndex: "balance_instructor_received",
            key: "balance_instructor_received",
            render: (balance_instructor_received: number) => (
                <div className="text-right">{balance_instructor_received.toLocaleString()} VND</div>
            ),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at: string) => new Date(created_at).toLocaleDateString(),
        },
    ];
    return (
        <div style={{ padding: "20px" }}>
            <Modal
                title="Transaction Details"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleOk} // You might want to use handleCancel here if you have it
                footer={[
                    <Button key="ok" onClick={handleOk}>
                        OK
                    </Button>
                ]}
            >
                {selectedTransactions.length > 0 ? (
                    <ul>
                        {selectedTransactions.map((transaction) => (
                            <li key={transaction._id}>
                                <div>
                                    <p>Purchase ID: {transaction.purchase_id}</p>
                                    <p>Price: {transaction.price}</p>
                                    <p>Discount: {transaction.discount}</p>
                                    <p>Price Paid: {transaction.price_paid}</p>
                                    <p>
                                        Created At:{" "}
                                        {new Date(transaction.created_at).toLocaleDateString()}
                                    </p>
                                    <h1>-------------------------------------------------------------------------------</h1>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No transactions found.</p>
                )}
            </Modal>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <SearchBar onSearch={handleSearch} />
            </div>

            <Table
                columns={columns}
                dataSource={payouts}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["4", "8"],
                    position: ["bottomRight"],
                }}
                locale={{
                    emptyText: isDataEmpty ? (
                        <Empty description="No payout found." />
                    ) : (
                        <Empty />
                    ),
                }}
            />
        </div>

    );
}

export default CompletedPayoutTable;