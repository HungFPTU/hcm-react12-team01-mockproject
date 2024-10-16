import { Button } from "antd";
import React from "react";

interface OrderSummaryProps {
  subtotal: number;
  totalDiscount: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  totalDiscount,
  total,
}) => {
  return (
    <div className="mt-8 p-6 bg-white shadow-md rounded-md max-w-sm mx-auto md:mx-0">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      <p>Subtotal: ${subtotal}</p>
      <p>Total Discount: -${totalDiscount}</p>
      <h4 className="text-2xl font-bold mt-4">Total: ${total}</h4>
      <Button type="primary" className="w-full mt-4">
        Checkout Now
      </Button>
    </div>
  );
};

export default OrderSummary;
