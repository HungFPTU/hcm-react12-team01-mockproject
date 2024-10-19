import { DeleteOutlined } from "@ant-design/icons";
import { Card, Checkbox } from "antd";
import React from "react";

interface Order {
  id: number;
  title: string;
  author: string;
  originalPrice: number;
  discountPrice: number;
  finalPrice: number;
}

interface OrderItemProps {
  order: Order;
  isSelected?: boolean;
  onSelectOrder?: (id: number) => void;
  onDeleteOrder?: (id: number) => void;
  variant?: "waiting" | "checkout"; // Phân biệt giao diện
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  isSelected = false,
  onSelectOrder,
  onDeleteOrder,
  variant = "waiting", // Mặc định là waiting
}) => {
  return (
    <Card
      className="shadow-md hover:shadow-lg transition-all mb-4"
      bordered={false}
    >
      <div className="flex items-start space-x-4">
        {variant === "waiting" && (
          <Checkbox
            checked={isSelected}
            onChange={() => onSelectOrder?.(order.id)}
            className="mt-1"
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{order.title}</h3>
          <p className="text-sm text-gray-500 mb-1">By {order.author}</p>
          <div className="flex space-x-2">
            <p className="line-through text-gray-400">${order.originalPrice}</p>
            <p className="text-green-500">Discount: ${order.discountPrice}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-red-500">${order.finalPrice}</p>
          {variant === "waiting" && (
            <DeleteOutlined
              className="text-red-500 cursor-pointer mt-2"
              onClick={() => onDeleteOrder?.(order.id)}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default OrderItem;
