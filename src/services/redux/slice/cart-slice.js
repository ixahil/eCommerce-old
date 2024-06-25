import { createSlice } from "@reduxjs/toolkit";

// let initalCart = {};

// if (typeof window !== "undefined") {
//   initalCart =
//     localStorage.getItem("cart") !== null
//       ? JSON.parse(localStorage.getItem("cart"))
//       : {};
// }

const initialState = {
  cartItems: [],

  totalPrice: 0,
  showCart: false,

  // showCart: false,
  // toggleCart: () => {},
  // addToCart: (productId) => {},
  // removeFromCart: (productId) => {},
  // clearCart: () => {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      //   state.cartItems.push(action.payload);
      state.showCart = true;
      const existingItem = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItem !== -1) {
        state.cartItems[existingItem].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload?.price;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.totalPrice -= action.payload.price;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    initialCart: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

// export actions
export const { addToCart, removeFromCart, clearCart, toggleCart, initialCart } =
  cartSlice.actions;

// export selectors
export const cartSelector = (state) => state.cart;

export default cartSlice;
