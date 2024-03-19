import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";

const store = configureStore({
  reducer: { book: bookSlice },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
