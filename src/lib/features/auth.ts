// src/reducers/auth.ts
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getUser } from "../data";

export type User = {
  name: string;
  email: string;
  image: string
};

export type Profile = {
  gender: string;
};
interface AuthState {
  user: User | null | unknown;
  profile: Profile | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set_user:  (state, action: PayloadAction<User | null | unknown>): void => {
      state.user = action.payload;
    },
    set_profile:  (state, action: PayloadAction<Profile | null>): void => {
      state.profile = action.payload;
    },
  }
})

export const { set_user, set_profile } = authSlice.actions

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
export const selectProfile = (state: RootState) => state.auth.profile

export default authSlice.reducer