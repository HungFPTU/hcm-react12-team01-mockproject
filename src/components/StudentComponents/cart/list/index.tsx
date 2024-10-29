import { Checkbox, Empty } from "antd";
import CartItem from "../item";
import {MockCartData} from "../mockCartData.ts";

interface CartListProps {
  items: MockCartData[];
  selectedItems: number[];
  onSelectItem: (id: number) => void;
  onSelectAll: () => void;
  onDeleteItem: (id: number) => void;
}

const CartList = ({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onDeleteItem,
}: CartListProps) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Checkbox
          checked={selectedItems.length === items.length}
          onChange={onSelectAll}
        >
          Select all
        </Checkbox>
        <span className="ml-auto text-blue-500">
          {selectedItems.length} Courses in Cart
        </span>
      </div>

      {items.length > 0 ? (
        items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.id)}
            onSelectItem={onSelectItem}
            onDeleteItem={onDeleteItem}
          />
        ))
      ) : (
        <Empty description="Your cart is empty." />
      )}
    </div>
  );
};

export default CartList;
