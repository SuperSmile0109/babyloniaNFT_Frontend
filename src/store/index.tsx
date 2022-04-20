// import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./walletSlice";
import grayscaleReducer from "./grayscaleSlice";
export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    grayscale: grayscaleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
