import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.details = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.details = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
