import { configureStore } from "@reduxjs/toolkit";
import chatroomsReducer from "../features/Chatrooms";
import userReducer from "../features/User";

export const store = configureStore({
  reducer: {
    chatrooms: chatroomsReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
