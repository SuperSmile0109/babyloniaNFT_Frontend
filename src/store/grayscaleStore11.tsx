// import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import grayscale from "./grayscaleSlice";

export const store = configureStore({
  reducer: {
    grayscale: grayscale,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
