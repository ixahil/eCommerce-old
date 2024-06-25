import { configureStore } from "@reduxjs/toolkit";
import userApi from "./api/user-api";
import userSlice from "./slice/user-slice";
import profileSlice from "./slice/profile-slice";
import profileApiSlice from "./api/profile-api";
import cartSlice from "./slice/cart-slice";
import productApiSlice from "./api/product-api";
import orderApiSlice from "./api/order-api";

const makeStore = () => {
  return configureStore({
    reducer: {
      [userSlice.reducerPath]: userSlice.reducer,
      [profileSlice.reducerPath]: profileSlice.reducer,
      [cartSlice.reducerPath]: cartSlice.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [profileApiSlice.reducerPath]: profileApiSlice.reducer,
      [productApiSlice.reducerPath]: productApiSlice.reducer,
      [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      userApi.middleware,
      profileApiSlice.middleware,
      productApiSlice.middleware,
      orderApiSlice.middleware,
    ],
  });
};

export default makeStore;
