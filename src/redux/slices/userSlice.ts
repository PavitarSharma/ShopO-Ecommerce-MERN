import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { IUser } from "@/utils/types";

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const SelectUserState = (state: RootState) => state.user;

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
