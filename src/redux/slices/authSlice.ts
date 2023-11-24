import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthPayload } from "../payload.types";

interface AuthState {
  isAuth: boolean;
  token: string | null;
  user: AuthPayload | null;
}

const initialState: AuthState = {
  isAuth: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, user } = action.payload;
      state.token = access_token;
      state.isAuth = true;
      state.user = user;
    },

    logOut: () => initialState,
  },
});

export const SelectAuthState = (state: RootState) => state.auth;

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
