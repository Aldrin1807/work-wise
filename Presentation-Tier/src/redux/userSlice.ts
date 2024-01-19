// src/redux/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    userId: null,
    role: null,
    email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
        state.email = action.payload.email;
        state.userId = action.payload.userId;
        state.role = action.payload.role;
        state.token = action.payload.token;
    },
    clearUser: (state) => {
        state.email = null;
        state.userId = null;
        state.role = null;
        state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
