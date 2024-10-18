import { Empty, Modal, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderList from "../../../../components/StudentComponents/order/lists";
import { orders as mockOrders } from "../../../../components/StudentComponents/order/mockData";
import OrderSummary from "../../../../components/StudentComponents/order/summary";

const WaitingPage: React.FC = () => {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [orders, setOrders] = useState(mockOrders);
  const navigate = useNavigate();

  const handleSelectOrder = (id: number) => {
    setSelectedOrders((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id]
    );
  };

  const confirmDeleteOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    notification.success({
      message: "Order Deleted",
      description: "The order has been deleted successfully.",
    });
  };

  const handleDeleteOrder = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this order?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => confirmDeleteOrder(id),
    });
  };

  const handleCheckout = () => {
    const selectedItems = orders.filter((order) =>
      selectedOrders.includes(order.id)
    );

    if (selectedItems.length > 0) {
      navigate("/checkout", { state: { selectedOrderItems: selectedItems } });
    } else {
      notification.warning({
        message: "No Orders Selected",
        description: "Please select at least one order to proceed to checkout.",
      });
    }
  };

  const subtotal = selectedOrders.reduce((acc, id) => {
    const order = orders.find((order) => order.id === id);
    return acc + (order?.finalPrice ?? 0); // Using ?? instead of ||
  }, 0);

  const totalDiscount = selectedOrders.reduce((acc, id) => {
    const order = orders.find((order) => order.id === id);
    return acc + (order?.discountPrice ?? 0); // Using ?? instead of ||
  }, 0);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-4">
          {orders.length > 0 ? (
            <OrderList
              orders={orders}
              selectedOrders={selectedOrders}
              onSelectOrder={handleSelectOrder}
              onDeleteOrder={handleDeleteOrder}
              onSelectAll={() =>
                setSelectedOrders(orders.map((order) => order.id))
              }
              allSelected={selectedOrders.length === orders.length}
            />
          ) : (
            <Empty description="No items in waiting paid" />
          )}
        </div>
      </div>
      <div className="md:col-span-1">
        <OrderSummary
          subtotal={subtotal}
          totalDiscount={totalDiscount}
          total={subtotal - totalDiscount}
          hasSelectedOrders={selectedOrders.length > 0}
          onCheckout={handleCheckout}
          variant="waiting" // Sử dụng giao diện mặc định
        />
      </div>
    </div>
  );
};

export default WaitingPage;
