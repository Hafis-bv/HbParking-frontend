import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: any;
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
  reducers: {},
});
