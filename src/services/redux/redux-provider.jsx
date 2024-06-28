"use client";
import React, { useRef } from "react";
import makeStore from "./store";
import { Provider } from "react-redux";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils";
import { initialCart } from "./slice/cart-slice";

const ReduxProvider = ({ children }) => {
  const storeRef = useRef();
  //  const initialDataRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();

    if (typeof window !== "undefined") {
      const cart = loadFromLocalStorage("cart");
      cart && storeRef.current.dispatch(initialCart(cart));
    }
  }

  storeRef.current.subscribe(() =>
    saveToLocalStorage(storeRef.current.getState().cart, "cart")
  );

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
