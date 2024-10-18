import {
  DollarCircleOutlined,
  ShopOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Button, notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  subtotal: number;
  totalDiscount: number;
  total: number;
  hasSelectedOrders?: boolean;
  onCheckout?: () => void;
  variant?: "waiting" | "checkout";
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  totalDiscount,
  total,
  hasSelectedOrders = false,
  onCheckout,
  variant = "waiting",
}) => {
  const navigate = useNavigate();

  const handleConfirmPurchase = () => {
    notification.success({
      message: "Purchase Successful",
      description: "Your purchase was completed successfully!",
    });

    navigate("/view-order");
  };

  const formatPrice = (value: number) =>
    value.toLocaleString("en-US", { minimumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="flex items-center bg-yellow-100 p-3 rounded-md">
        <DollarCircleOutlined className="text-yellow-500 text-2xl mr-2" />
        <span className="flex-1 text-lg font-medium">Original Price:</span>
        <span className="text-lg font-bold">${formatPrice(subtotal)}</span>
      </div>

      <div className="flex items-center bg-green-100 p-3 rounded-md">
        <TagOutlined className="text-green-500 text-2xl mr-2" />
        <span className="flex-1 text-lg font-medium">Discount Amount:</span>
        <span className="text-lg font-bold text-green-600">
          -${formatPrice(totalDiscount)}
        </span>
      </div>

      <div className="flex items-center bg-blue-100 p-3 rounded-md">
        <ShopOutlined className="text-blue-500 text-2xl mr-2" />
        <span className="flex-1 text-lg font-medium">Total Price:</span>
        <span className="text-lg font-bold text-blue-600">
          ${formatPrice(total)}
        </span>
      </div>

      {variant === "checkout" && (
        <Button
          type="primary"
          className="w-full mt-6 py-2 rounded-md"
          onClick={handleConfirmPurchase}
          style={{ backgroundColor: "#1D4ED8", borderColor: "#1D4ED8" }}
        >
          Confirm Purchase
        </Button>
      )}

      {variant === "waiting" && (
        <Button
          type="primary"
          className="w-full mt-4"
          onClick={onCheckout}
          disabled={!hasSelectedOrders}
        >
          Checkout Now
        </Button>
      )}
    </div>
  );
};

export default OrderSummary;
