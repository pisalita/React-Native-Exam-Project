import { configureStore } from "@reduxjs/toolkit";
import chatroomsReducer from "../features/Chatrooms";

export const store = configureStore({
  reducer: {
    chatrooms: chatroomsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
