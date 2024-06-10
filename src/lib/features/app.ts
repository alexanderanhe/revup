// src/reducers/app.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

export type LoginModal = 'signIn' | 'signUp' | false;
interface AppState {
  loginModal: LoginModal;
}

const initialState: AppState = {
  loginModal: false,
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login_modal: (state, action: PayloadAction<LoginModal>): void => {
      state.loginModal = action.payload;
    },
  }
})

export const { login_modal } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectTheme = (state: RootState) => state.app.theme

export default appSlice.reducer