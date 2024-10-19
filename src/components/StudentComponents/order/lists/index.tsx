import { Checkbox } from "antd";
import React from "react";
import OrderItem from "../item";
import { Order } from "../mockData";

interface OrderListProps {
  orders: Order[];
  selectedOrders: number[];
  onSelectOrder: (id: number) => void;
  onDeleteOrder: (id: number) => void;
  onSelectAll: () => void;
  allSelected: boolean;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  selectedOrders,
  onSelectOrder,
  onDeleteOrder,
  onSelectAll,
  allSelected,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Checkbox onChange={onSelectAll} checked={allSelected}>
          Select all
        </Checkbox>
        <span>{`${selectedOrders.length} courses in waiting paid`}</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            isSelected={selectedOrders.includes(order.id)}
            onSelectOrder={onSelectOrder}
            onDeleteOrder={onDeleteOrder}
            variant="waiting"
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
