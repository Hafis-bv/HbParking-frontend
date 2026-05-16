import { firebaseAuth } from "@/lib/firebase";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IUser {
  name: string;
  id: string;
  email: string;
  photoURL: string;
  creationTime: string;
  lastSignInTime: string;
}

interface InitialState {
  user: IUser | null;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: InitialState = {
  user: null,
  error: null,
  loading: false,
  isLoggedIn: false,
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = firebaseAuth.currentUser;
      if (!currentUser) return rejectWithValue("No user logged in");
      const token = await currentUser.getIdToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue("Failed to fetch user");
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
