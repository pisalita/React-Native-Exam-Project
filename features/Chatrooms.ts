import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chatroom } from "../interfaces/IChatRoom";
import { store } from "../app/store";

interface ChatroomsSliceState {
  chatrooms: Chatroom[];
}

const initialState: ChatroomsSliceState = {
  chatrooms: [
    {
      id: 1,
      title: "testroom - redux test",
      messages: ["test message", "another test message"],
    },
  ],
};

export const chatroomsSlice = createSlice({
  name: "chatrooms",
  initialState,
  reducers: {
    createChatroom: (state, action: PayloadAction<string>) => {
      state.chatrooms = [
        ...state.chatrooms,
        {
          id: state.chatrooms.length,
          title: action.payload,
          messages: [],
        },
      ];
    },
  },
});

export const { createChatroom } = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
