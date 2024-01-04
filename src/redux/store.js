import { configureStore } from "@reduxjs/toolkit";
import authReducer from "src/redux/authSlice";
import toastReducer from "src/redux/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
  },
});