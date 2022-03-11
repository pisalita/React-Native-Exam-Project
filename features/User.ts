import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ActionSheetIOS } from "react-native";
import { User } from "../interfaces/IUser";

interface UserSliceState {
  user: User | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}
const initialState: UserSliceState = {
  user: null,
  loading: "idle",
};

let userDetails: User = {
  name: "",
  email: "",
  displayName: "",
  photoUrl: "",
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: User) => {
    const { name, email, password, displayName, photoUrl } = user;
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZ8nPUBrJHcHbtsNUpKoycYdPVguoFffA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    userDetails = {
      name,
      email,
      displayName,
      photoUrl,
    };
    const formattedResponse = await res.json();
    return formattedResponse as User;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = {
        // name: userDetails.name,
        // email: action.payload.email,
        // displayName: userDetails.displayName,
        // photoUrl: userDetails.photoUrl,
        ...action.payload,
      };
      state.loading = "succeeded";
    });
    builder.addCase(createUser.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export default userSlice.reducer;
