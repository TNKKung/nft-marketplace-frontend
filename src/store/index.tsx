import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { save, load } from "redux-localstorage-simple";

import userAccount from "./UserAction";
import transactionRes from "./TransactionAction";

const PERSISTED_KEYS = {
  states: ["userAccount"],
  namespace: "app",
};

const store = configureStore({
  reducer: {
    userAccount: userAccount,
    transactionRes: transactionRes,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save(PERSISTED_KEYS)),
  preloadedState: load(PERSISTED_KEYS),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = (): AppDispatch => useDispatch();

export default store;
