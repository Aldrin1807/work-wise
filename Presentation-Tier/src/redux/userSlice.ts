// src/redux/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
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
        state.isAuthenticated = action.payload.isAuthenticated;
        state.email = action.payload.email;
        state.userId = action.payload.userId;
        state.role = action.payload.role;
        state.token = action.payload.token;
    },
    clearUser: (state) => {
        state.isAuthenticated = false;
        state.email = null;
        state.userId = null;
        state.role = null;
        state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
