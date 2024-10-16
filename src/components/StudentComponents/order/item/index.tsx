import { DeleteOutlined } from "@ant-design/icons";
import { Card, Checkbox } from "antd";
import React from "react";

interface OrderItemProps {
  order: {
    id: number;
    title: string;
    author: string;
    originalPrice: number;
    discountPrice: number;
    finalPrice: number;
  };
  isSelected: boolean;
  onSelectOrder: (id: number) => void;
  onDeleteOrder: (id: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  isSelected,
  onSelectOrder,
  onDeleteOrder,
}) => {
  return (
    <Card
      className="shadow-md hover:shadow-lg transition-transform"
      bordered={false}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start w-full">
          <Checkbox
            checked={isSelected}
            onChange={() => onSelectOrder(order.id)}
            className="mr-4 mt-2"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{order.title}</h3>
            <p className="text-sm text-gray-600 mb-1">By {order.author}</p>
            <div className="flex items-center space-x-2">
              <p className="line-through text-gray-400">{`$${order.originalPrice}`}</p>
              <p className="text-green-500">Discount: ${order.discountPrice}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-red-500 font-bold mr-4">{`$${order.finalPrice}`}</div>
          <DeleteOutlined
            onClick={() => onDeleteOrder(order.id)}
            className="text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
};

export default OrderItem;
