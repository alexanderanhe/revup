// src/reducers/auth.ts
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getUser } from "../data";

export type User = {
  name: string;
  email: string;
  image: string
};
interface AuthState {
  user: User | null | unknown;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set_user:  (state, action: PayloadAction<User | null | unknown>): void => {
      state.user = action.payload;
    },
  }
})

export const { set_user } = authSlice.actions

export const setUserData = async (dispatch: Dispatch) => {
  try {
    const user = await getUser();
    dispatch(set_user(user));
  } catch {
    dispatch(set_user(null));
  }
}

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer