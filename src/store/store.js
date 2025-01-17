import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../features/apislice";
import userReducer from "../features/userslice";

export const store = configureStore({
  reducer: {
    api: apiReducer, // Handles API-related state
    user: userReducer, // Handles user-related state
  },
});

export default store;
