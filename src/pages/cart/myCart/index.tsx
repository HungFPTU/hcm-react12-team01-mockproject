import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartList from "../../../components/StudentComponents/cart/list";
import OrderSummary from "../../../components/StudentComponents/order/summary";
import { toast } from "react-toastify";

const mockCartItems = [
  {
    id: 1,
    title: "Financial Analysis and Financial Modeling using MS Excel",
    author: "Ngô Thị Tuyết Trúc",
    price: 599000,
    discount: 137770, // Discount amount
    finalPrice: 461230, // Price after discount
    image: "https://via.placeholder.com/80x40",
  },
  {
    id: 2,
    title: "Beginner Guitar Lessons",
    author: "Trần Văn Hùng",
    price: 549000,
    discount: 54900, // Discount amount
    finalPrice: 494100, // Price after discount
    image: "https://via.placeholder.com/80x40",
  },
];

const MyCartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate(); // Initialize the router navigation hook

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleteItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("The item has been removed from your cart.");
  };

  const handleCheckout = () => {
    const selectedItemsData = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (selectedItemsData.length > 0) {
      navigate("/student/checkout", {
        state: { selectedOrderItems: selectedItemsData },
      });
    } else {
      toast.error("Please select items to proceed to checkout.");
    }
  };

  const subtotal = selectedItems.reduce((acc, id) => {
    const item = cartItems.find((item) => item.id === id);
    return acc + (item?.price ?? 0); // Use the original price
  }, 0);

  const totalDiscount = selectedItems.reduce((acc, id) => {
    const item = cartItems.find((item) => item.id === id);
    return acc + (item?.discount ?? 0); // Use the discount amount directly
  }, 0);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-4">My Cart</h2>
        <CartList
          items={cartItems}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onDeleteItem={handleDeleteItem}
        />
      </div>

      <div className="md:col-span-1">
        <OrderSummary
          subtotal={subtotal}
          totalDiscount={totalDiscount}
          total={subtotal - totalDiscount}
          hasSelectedOrders={selectedItems.length > 0}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default MyCartPage;
