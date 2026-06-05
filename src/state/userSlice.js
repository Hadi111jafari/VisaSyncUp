import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    setUserDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
