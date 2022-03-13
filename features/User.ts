import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/IUser";

interface UserSliceState {
  user: User | null;
  error: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
}
const initialState: UserSliceState = {
  user: null,
  error: null,
  loading: "idle",
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: User, { rejectWithValue }) => {
    const { email, password } = user;

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
          returnSecureToken: true,
        }),
      }
    );
    if (!res.ok) {
      return rejectWithValue(await res.json());
    } else {
      return { email };
    }
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
      state.user = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "failed";
    });
  },
});

export default userSlice.reducer;
