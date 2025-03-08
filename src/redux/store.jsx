import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice"; // Import the slice

export const store = configureStore({
  reducer: {
    session: sessionReducer, // Add session slice to Redux store
  },
});
