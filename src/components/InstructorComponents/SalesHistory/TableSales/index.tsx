import { useState } from 'react';
import { Table } from 'antd';
import { Purchase, PurchaseStatusEnum } from '../../../../model/Purchase';
import Purchases from '../../../../data/Purchases.json';
import Carts from '../../../../data/Carts.json';

const SalesHistoryTable = () => {
  const [purchasesData] = useState<Purchase[]>(Purchases.purchases as unknown as Purchase[]);
  const [cartsData] = useState(Carts.carts);
  const [searchTerm] = useState<string>("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // State để lưu key của các hàng được chọn

  const filteredPurchases = purchasesData.filter((purchase) =>
    purchase.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    purchase.purchase_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCartNo = (cartId: string) => {
    const cart = cartsData.find(cart => cart.id === cartId);
    return cart ? cart.cart_no : 'N/A';
  };

  const columns = [
    {
      title: 'Purchase No',
      dataIndex: 'purchase_no',
      key: 'purchase_no',
    },
    {
      title: 'Cart No',
      dataIndex: 'cart_id',
      key: 'cart_no',
      render: (cart_id: string) => getCartNo(cart_id),
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
      render: (course_name: string) => `${course_name}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PurchaseStatusEnum) => `${status}`,
    },
    {
      title: 'Price Paid',
      dataIndex: 'price_paid',
      key: 'price_paid',
      render: (price_paid: number) => `${price_paid.toLocaleString()} VND`,
    },
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
      render: (student_name: string) => `${student_name}`,
    },
  ];

  return (
    <Table<Purchase>
      rowSelection={{
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        // Tùy chỉnh thêm nếu cần
      }}
      columns={columns}
      dataSource={filteredPurchases}
      rowKey="id"
      className="w-full shadow-md rounded-lg overflow-hidden"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} khóa học`,
      }}
      components={{
        body: {
          cell: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {
            // Bỏ tiêu đề cho cột checkbox
            if ('data-index' in props && props['data-index'] === '0') {
              return null; // Không hiển thị tiêu đề cho cột checkbox
            }
            return <td {...props} />;
          },
        },
      }}
    />
  );
};

export default SalesHistoryTable;
