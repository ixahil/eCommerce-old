"use client";
import { cartSelector, toggleCart } from "@/services/redux/slice/cart-slice";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import CartDrawer from "./cart-drawer";

const CartIcon = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(cartSelector);
  const handleClick = () => {
    dispatch(toggleCart());
  };
  return (
    <>
      <div className="relative">
        <ShoppingBag
          strokeWidth={1}
          size={50}
          className="cursor-pointer bg-primary rounded-full p-2.5"
          onClick={handleClick}
        />

        <span className="text-xs font-bold absolute -top-1 right-0 bg-red-500 text-white size-5 rounded-full text-center">
          {cartItems.length || 0}
        </span>
      </div>
      <CartDrawer />
    </>
  );
};

export default CartIcon;
