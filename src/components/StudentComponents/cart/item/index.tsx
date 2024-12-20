import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox } from "antd";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    author: string;
    price: number;
    discount: number;
    finalPrice: number;
    image: string; // Image prop
  };
  isSelected?: boolean; // Optional for rejected tab
  onSelectItem?: (id: number) => void; // Optional for rejected tab
  onDeleteItem: (id: number) => void; // Common functionality
  variant?: "cart" | "rejected"; // Controls behavior between cart and rejected tabs
}

const CartItem = ({
                    item,
                    isSelected = false,
                    onSelectItem,
                    onDeleteItem,
                    variant = "cart",
                  }: CartItemProps) => {
  return (
      <Card className="my-cart-item shadow-md">
        <div className="flex items-center space-x-4">
          {variant === "cart" && (
              <Checkbox
                  checked={isSelected}
                  onChange={() => onSelectItem?.(item.id)}
              />
          )}

          {/* Product Image */}
          <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover"
          />

          <div className="flex-1">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-gray-500">By {item.author}</p>
            <p className="text-green-500">Discount: ${item.discount}</p>
          </div>

          <div className="flex items-center space-x-2">
            <p className="text-red-500 font-semibold">${item.finalPrice}</p>

            {variant === "cart" ? (
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => onDeleteItem(item.id)}
                />
            ) : (
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => onDeleteItem(item.id)}
                >
                  Rebuy
                </Button>
            )}
          </div>
        </div>
      </Card>
  );
};

export default CartItem;
