import { notification } from "antd";
import { useState } from "react";
import CartList from "../../../../components/StudentComponents/cart/list";

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

const RejectedCartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

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
    notification.success({
      message: "Item Removed",
      description: "The item has been removed from your cart.",
    });
  };

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
    </div>
  );
};

export default RejectedCartPage;
