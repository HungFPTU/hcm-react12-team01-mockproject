import React, { useState, useEffect, lazy, useRef } from "react";
import { Table, Empty, Popover, Button } from "antd";
import { GetPurchaseRequest } from "../../../model/admin/request/Purchase.request";
import { PurchaseService } from "../../../services/PurchaseService/purchase.service";
import { Purchase } from "../../../model/admin/response/Purchase.response";
import { CreatePayoutRequest } from "../../../model/admin/request/Payout.request";
import { toast } from "react-toastify";
const SearchBar = lazy(() => import("./SearchBar"));

const CategoryManagement: React.FC = () => {
  const [purchase, setPurchase] = useState<Purchase[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false); // Track if data is empty
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const hasMounted = useRef(false);

  // Function to fetch categories from API
  const fetchPurchase = async (params: GetPurchaseRequest) => {
    try {
      const response = await PurchaseService.getPurchaseForInstructor(params);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch purchases:", error);
      throw error;
    }
  };

  const fetchPurchaseData = async () => {
    try {
      const searchCondition = {
        purchase_no: "",
        cart_no: "",
        course_id: "",
        status: "",
        is_delete: false,
      };

      const response = await fetchPurchase({
        searchCondition,
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });

      if (response && response.success) {
        const data = response.data.pageData;
        setPurchase(data);
        setIsDataEmpty(data.length === 0);
      }
    } catch  {
      toast.error("Failed to fetch categories:");
    }
  };
  useEffect(() => {
    if (hasMounted.current) return; // Trả về nếu đã mount
    hasMounted.current = true;

    fetchPurchaseData();
  }, [searchQuery, searchType]);

  // Handle search functionality
  const handleSearch = async (query: string, type: string) => {
    setSearchQuery(query);
    setSearchType(type);

    // Update the search condition based on the latest query and type
    const searchCondition = {
      purchase_no: query,
      cart_no: "",
      course_id: "",
      status: type,
      is_delete: false,
    };

    try {
      const response = await fetchPurchase({
        searchCondition,
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });

      if (response && response.success) {
        const data = response.data.pageData;
        setPurchase(data);
        setIsDataEmpty(data.length === 0);
      }
    } catch  {
      toast.error("Failed to fetch categories:");
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleClick = async () => {
    try {
      let instructorId = "";

      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          instructorId = parsedUserInfo._id;
        } catch{
          toast.error("Error parsing userInfo:");
        }
      } else {
        toast.error("userInfo not found in localStorage.");
      }

      const request: CreatePayoutRequest = {
        instructor_id: instructorId,
        transactions: selectedRowKeys.map((purchase_id) => ({
          purchase_id: purchase_id as string, // Ensure correct type
        })),
      };

      const response = await PurchaseService.createPayout(request);
      if (response && response.data.success) {
        toast.success("Create payout successfully!");
        fetchPurchaseData();
        setSelectedRowKeys([]);
      }
    } catch  {
      toast.error("Faild");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: Purchase) => ({
      disabled: record.status !== "new" && record.status !== "rejected",
    }),
  };

  // Columns for the table
  const columns = [
    {
      title: "Purchase_No",
      dataIndex: "purchase_no",
      key: "purchase_no",
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <div className="text-right">{price.toLocaleString()} VND</div>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => (
        <div className="text-right">{discount}%</div>
      ),
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      render: (price_paid: number) => (
        <div className="text-right">{price_paid.toLocaleString()} VND</div>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <Button type="primary" onClick={handleClick}>
          Create Payout
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={purchase}
        rowKey="_id"
        rowSelection={rowSelection} // Add this line for row selection
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8"],
          position: ["bottomRight"],
        }}
        locale={{
          emptyText: isDataEmpty ? (
            <Empty description="No categories found." />
          ) : (
            <Empty />
          ),
        }}
      />
    </div>
  );
};

export default CategoryManagement;