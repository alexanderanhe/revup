// src/reducers/app.ts
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

export type LoginModal = 'signIn' | 'signUp' | false;

interface AppState {
  loginModal: LoginModal;
  assessment: boolean;
}

const initialState: AppState = {
  loginModal: false,
  assessment: false,
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login_modal: (state, action: PayloadAction<LoginModal>): void => {
      state.loginModal = action.payload;
    },
    set_assessment: (state, action: PayloadAction<boolean>): void => {
      state.assessment = action.payload;
    },
  }
})

export const { login_modal, set_assessment } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectTheme = (state: RootState) => state.app.theme
export const selectAssessment = (state: RootState) => state.app.assessment

export default appSlice.reducer