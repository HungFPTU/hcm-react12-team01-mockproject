/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from "react";

import { CartStatusEnum } from "../model/Cart";
import { CartService } from "../services/cart/cart.service";

interface CartContextType {
  cartItems: any[];
  cartCount: number;
  cartCompletedItems: any[]; // New property for completed cart count
  updateCartItems: (status?: CartStatusEnum) => Promise<void>;
  updateCartStatus: (
    cartIds: string | string[],
    status: CartStatusEnum
  ) => Promise<void>;
  deleteCartItem: (cartId: string) => Promise<void>;
  getCartCount: () => Promise<void>;
  getCompletedCount: () => Promise<void>; // New function to fetch completed count
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartCompletedItems, setCartCompletedItems] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem("token");
  const defaultStatus = CartStatusEnum.new;

  const updateCartItems = async (status?: CartStatusEnum) => {
    if (!token) {
      console.log("No token found, skipping cart fetch");
      return;
    }

    try {
      const response = await CartService.getCarts({
        searchCondition: {
          status: status ?? defaultStatus,
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });
      const items = Array.isArray(response.data.data.pageData)
        ? response.data.data.pageData
        : [response.data.data.pageData];
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateCartStatus = async (
    cartIds: string | string[],
    status: CartStatusEnum
  ) => {
    try {
      const idsArray = Array.isArray(cartIds) ? cartIds : [cartIds];

      const itemsToUpdate = cartItems.filter((item) =>
        idsArray.includes(item._id)
      );
      if (itemsToUpdate.length > 0) {
        const items = itemsToUpdate.map((item) => ({
          _id: item._id,
          cart_no: item.cart_no,
        }));
        await CartService.UpdateStatusCart({ status, items });
        updateCartItems(status);
        getCartCount();
      } else {
        console.error(
          `No cart items found for the provided IDs: ${idsArray.join(", ")}`
        );
      }
    } catch (error) {
      console.error("Error updating cart status:", error);
    }
  };

  const deleteCartItem = async (cartId: string) => {
    try {
      await CartService.DeleteCart(cartId);
      console.log(`Cart item with ID ${cartId} deleted`);
      updateCartItems(CartStatusEnum.new);
      getCartCount();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const getCartCount = async () => {
    if (!token) {
      console.log("No token found, skipping cart count fetch");
      setCartCount(0); // Đặt giá trị mặc định nếu chưa đăng nhập
      return;
    }

    try {
      let totalCount = 0;

      // Fetch count for waiting_paid status
      const responseWaitingPaid = await CartService.getCarts({
        searchCondition: {
          status: CartStatusEnum.waiting_paid,
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });
      totalCount += responseWaitingPaid.data.data.pageData.length;

      // Fetch count for new status
      const responseNew = await CartService.getCarts({
        searchCondition: {
          status: CartStatusEnum.new,
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });
      totalCount += responseNew.data.data.pageData.length;

      setCartCount(totalCount);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0); // Đảm bảo reset giá trị nếu xảy ra lỗi
    }
  };
  const getCompletedCount = async () => {
    if (!token) {
      console.log("No token found, skipping completed count fetch");
      return;
    }

    try {
      const response = await CartService.getCarts({
        searchCondition: {
          status: CartStatusEnum.completed, // Fetch carts with "completed" status
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 100000,
        },
      });
      // Assuming the API response structure is similar to getCartCount
      const completedCount = response.data.data.pageData;
      setCartCompletedItems(completedCount);
    } catch (error) {
      console.error("Error fetching completed count:", error);
    }
  };
  useEffect(() => {
    if (token) {
      updateCartItems(CartStatusEnum.new);
      getCartCount();
      getCompletedCount();
    } else {
      setCartItems([]); // Reset giỏ hàng nếu không có token
      setCartCount(0); // Đặt giá trị mặc định
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartCompletedItems, // Add completedCount to the context value
        updateCartItems,
        updateCartStatus,
        deleteCartItem,
        getCartCount,
        getCompletedCount, // Add getCompletedCount to the context value
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
