import { useLocation, useNavigate } from "react-router-dom";
import OrderItem from "../../../../components/StudentComponents/order/item";
import { Order } from "../../../../components/StudentComponents/order/mockData";
import OrderSummary from "../../../../components/StudentComponents/order/summary";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedOrderItems: Order[] = location.state?.selectedOrderItems ?? [];

  if (!selectedOrderItems.length) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>No items selected for checkout.</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={() => navigate("/cart")}
        >
          Go back to Cart
        </button>
      </div>
    );
  }

  const subtotal = selectedOrderItems.reduce(
    (acc, item) => acc + (item.originalPrice || 0),
    0
  );

  const totalDiscount = selectedOrderItems.reduce(
    (acc, item) => acc + (item.discountPrice || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 shadow-md rounded-lg">
        <div className="divide-y divide-gray-200 mb-4">
          {selectedOrderItems.map((item) => (
            <OrderItem key={item.id} order={item} variant="checkout" />
          ))}
        </div>

        <OrderSummary
          subtotal={subtotal}
          totalDiscount={totalDiscount}
          total={subtotal - totalDiscount}
          variant="checkout"
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
