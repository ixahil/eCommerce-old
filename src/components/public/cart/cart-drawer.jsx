"use client";

import {
  cartSelector,
  toggleCart,
  removeFromCart,
} from "@/services/redux/slice/cart-slice";
import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

const CartDrawer = () => {
  const { cartItems, totalPrice, showCart } = useSelector(cartSelector);
  const cartRef = useRef();
  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      if (
        !(event.target.localName === "button") &&
        !(event.target.localName === "svg")
      ) {
        dispatch(toggleCart());
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef]);

  const cart = (
    <div
      className="h-screen w-72 border-2 fixed top-0 right-0 bg-white py-10 px-6"
      ref={cartRef}
    >
      <div className="flex items-center gap-4 border-b-4 border-primaryAccent pb-2">
        <ShoppingCart size={28} />
        <h4 className="text-xl font-bold text-center">Cart</h4>
      </div>
      <div className="flex flex-col justify-between h-full py-10">
        <div className="space-y-4">
          <div className="py-16 space-y-4">
            {cartItems.map((cartItem, index) => {
              return (
                <div
                  className="flex items-center justify-between border-b pb-2"
                  key={index}
                >
                  <div className="flex items-center">
                    <h6 className="pr-2">{cartItem.name}</h6>
                    <span>x {cartItem.quantity}</span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <p className="font-bold">{cartItem.price}</p>

                    <div>
                      <Trash2
                        size={16}
                        onClick={() => dispatch(removeFromCart(cartItem))}
                        color="red"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {cartItems.length > 0 && (
              <button
                type="button"
                className="bg-primaryAccent flex items-center py-4 gap-4 justify-center w-full"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart <Trash2 />
              </button>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="border-y-2 text-xl font-bold flex justify-between py-4">
            <h4>Total</h4>
            <span>${totalPrice}</span>
          </div>

          <div className="text-center">
            <Link href={"/checkout"}>
              <button type="button" className="bg-primaryAccent py-2 px-4">
                Checkout {">"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>{showCart ? createPortal(cart, document.getElementById("cart")) : null}</>
  );
};

export default CartDrawer;
