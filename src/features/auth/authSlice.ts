import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setUser, logout } = authSlice.actions;
