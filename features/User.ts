import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/IUser";

type errorFormat = {
  error: {
    code?: number | undefined;
    message?: string | undefined;
  };
};

interface UserSliceState {
  user: User | null;
  error: { code: number | undefined; message: string | undefined };
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserSliceState = {
  user: null,
  error: { code: 200, message: "no errors" },
  loading: "idle",
};

export const createUser = createAsyncThunk<
  User,
  User,
  { rejectValue: errorFormat }
>("user/createUser", async (user: User, { rejectWithValue }) => {
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
    return rejectWithValue((await res.json()) as errorFormat);
  } else {
    return await res.json();
  }
});

export const login = createAsyncThunk<User, User, { rejectValue: errorFormat }>(
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

    const { idToken } = await res.json();

    //another call to get all user data (with idToken from first call). return this instead as it has all properties in response.
    const res2 = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZ8nPUBrJHcHbtsNUpKoycYdPVguoFffA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
        }),
      }
    );

    if (!res2.ok) {
      return rejectWithValue((await res2.json()) as errorFormat);
    } else {
      let res = await res2.json();
      res = { ...res, idToken: idToken };
      return res;
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  User,
  { rejectValue: errorFormat }
>("user/updateUser", async (data: User, { rejectWithValue, getState }: any) => {
  const { displayName, photoUrl } = data;

  const { user } = getState();
  const idToken = user.user.idToken;

  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZ8nPUBrJHcHbtsNUpKoycYdPVguoFffA",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
        displayName,
        photoUrl,
        returnSecureToken: true,
      }),
    }
  );

  if (!res.ok) {
    return rejectWithValue((await res.json()) as errorFormat);
  } else {
    return await res.json();
  }
});

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
        ...state.user,
        idToken: action.payload.idToken,
        email: action.payload.email,
      };
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.error.code = action.payload?.error.code;
      state.error.message = action.payload?.error.message;
      state.loading = "failed";
    });
    builder.addCase(login.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        idToken: action.payload.idToken,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoUrl: action.payload.photoUrl,
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error.code = action.payload?.error.code;
      state.error.message = action.payload?.error.message;
      state.loading = "failed";
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        displayName: action.payload.displayName,
        photoUrl: action.payload.photoUrl,
      };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error.code = action.payload?.error.code;
      state.error.message = action.payload?.error.message;
      state.loading = "failed";
    });
  },
});

export default userSlice.reducer;
