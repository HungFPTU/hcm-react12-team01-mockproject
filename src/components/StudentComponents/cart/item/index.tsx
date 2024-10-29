import {DeleteOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {Button, Card, Checkbox} from "antd";
import { MockCartData } from "../mockCartData";

interface CartItemProps {
    item: MockCartData;
    isSelected?: boolean;
    onSelectItem?: (id: number) => void;
    onDeleteItem: (id: number) => void;
    variant?: "cart" | "rejected";
}

const CartItem = ({
                      item,
                      isSelected = false,
                      onSelectItem,
                      onDeleteItem,
                      variant = "cart",
                  }: CartItemProps) => {
    return (
        <Card className="my-cart-item shadow-md rounded-lg hover:shadow-lg transition-all p-4">
            <div className="flex items-start space-x-4">
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
                    className="w-20 h-20 rounded-md object-cover border border-gray-200"
                />

                {/* Product Details */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold truncate">{item.title}</h3>
                    <p className="text-gray-500">By {item.author}</p>
                    <p className="text-green-500">Discount: ${item.discount}</p>

                    {/* Price and Actions */}
                    <div className="mt-4">
                        <p className="text-red-500 font-semibold text-xl">
                            ${item.finalPrice}
                        </p>

                        {variant === "rejected" && (
                            <Button
                                type="primary"
                                icon={<ShoppingCartOutlined/>}
                                className="w-full mt-2 bg-red-500 hover:bg-red-600 border-none"
                                onClick={() => onDeleteItem(item.id)}
                            >
                                Rebuy
                            </Button>
                        )}
                    </div>
                </div>

                {variant === "cart" && (
                    <Button
                        type="text"
                        icon={<DeleteOutlined/>}
                        onClick={() => onDeleteItem(item.id)}
                    />
                )}
            </div>
        </Card>
    );
};

export default CartItem;
