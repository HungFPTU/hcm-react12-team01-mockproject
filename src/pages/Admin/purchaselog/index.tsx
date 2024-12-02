import { Input, Select, Table } from "antd";
import { useState, useEffect, useRef, useCallback } from "react";
import { PurchaseService } from "../../../services/PurchaseService/purchase.service";
import { GetPurchaseResponseData } from "../../../model/admin/response/Purchase.response";
const { Option } = Select;

const PurchaseLogTable = () => {
  const [purchaseLogData, setPurchaseLogData] = useState<
    GetPurchaseResponseData[]
  >([]);
  const hasMounted = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("");
  const fetchPurchaseLogData = useCallback(async () => {
    try {
      const response = await PurchaseService.getPurchaseForAdmin({
        pageInfo: {
          pageNum: 1,
          pageSize: 10000,
        },
        searchCondition: {
          purchase_no: searchQuery,
          cart_no: "",
          course_id: "",
          status: filterValue,
          is_delete: false,
        },
      });
      if (response.data && response.data.data && response.data.data.pageData) {
        setPurchaseLogData(response.data.data.pageData);
      } else {
        console.error("pageData không tồn tại trong phản hồi:", response.data);
      }
    } catch (error) {
      console.error("Error fetching purchase logs:", error);
    }
  }, [searchQuery, filterValue]);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchPurchaseLogData();
  }, []);

  useEffect(() => {
    if (purchaseLogData.length > 0) {
      console.log("Có khóa học trong purchaseLogData:", purchaseLogData);
    }
  }, [purchaseLogData]);

  const handleSearch = () => {
    fetchPurchaseLogData();
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Purchase Number",
      dataIndex: "purchase_no",
      key: "purchase_no",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        let color;
        switch (text) {
          case "new":
            color = "blue"; // Màu xanh dương cho status new
            break;
          case "completed":
            color = "green"; // Màu xanh lá cho status complete
            break;
          case "request_paid":
            color = "gold"; // Màu vàng cho status waiting paid
            break;
          default:
            color = "black"; // Màu mặc định
        }
        return (
          <span
            style={{
              color,
              border: `1px solid ${color}`,
              padding: "2px 4px",
              borderRadius: "4px",
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      render: (price: number) => (
        <span>${price ? price.toFixed(2) : "N/A"}</span>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => (
        <span>${discount ? discount.toFixed(2) : "N/A"}</span>
      ),
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: Date) => (
        <span>{new Date(date).toLocaleDateString()}</span>
      ),
    },
  ];

  return (
    <div className="w-5em">
      <Input.Search
        className="w-1/4"
        placeholder="Search by Purchase Number..."
        value={searchQuery}
        onSearch={handleSearch}
        onPressEnter={handleSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
        enterButton
      />
      <Select
        placeholder="Filter by status"
        value={filterValue}
        onChange={(value) => setFilterValue(value)}
        style={{ width: 200, marginLeft: 10 }}
      >
        <Option value="">All Status</Option>
        <Option value={"new"}>New</Option>
        <Option value={"completed"}>Completed</Option>
        <Option value={"request_paid"}>Request Paid</Option>
      </Select>
      <div className="w-full">
        <Table<GetPurchaseResponseData>
          dataSource={purchaseLogData}
          columns={columns}
          rowKey="purchase_no"
          className="w-full shadow-md rounded-lg overflow-hidden"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} courses`,
          }}
        />
      </div>
    </div>
  );
};

export default PurchaseLogTable;
