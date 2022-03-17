import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/IUser";

type errorFormat = {
  error: {
    errors: [
      {
        domain: string;
        reason: string;
        message: string;
      }
    ];
    code: number;
    message: string;
  };
};

interface UserSliceState {
  user: User | null;
  error: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
}
const initialState: UserSliceState = {
  user: null,
  error: { error: "No errors" },
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
      return await res.json();
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (user: User, { rejectWithValue }) => {
    const { email, password } = user;

    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZ8nPUBrJHcHbtsNUpKoycYdPVguoFffA",
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
      return await res.json();
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
      state.user = {
        localId: action.payload.localId,
        email: action.payload.email,
      };
      state.loading = "succeeded";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "failed";
    });
    builder.addCase(login.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = {
        localId: action.payload.localId,
        email: action.payload.email,
      };
      state.loading = "succeeded";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "failed";
    });
  },
});

export default userSlice.reducer;
