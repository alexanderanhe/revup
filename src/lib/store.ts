// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setUserData } from './features/auth';
import appReducer from './features/app';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

const dispatch = store.dispatch;
setUserData(dispatch);
// checkAssessment(dispatch);

// https://redux.js.org/usage/usage-with-typescript
// more info: https://react-redux.js.org/using-react-redux/usage-with-typescript {OBSOLETE}