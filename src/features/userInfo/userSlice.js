import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  email: null,
  id: null,
  role: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.email = null;
      state.id = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUser, logoutUser } = userSlice.actions;

// Selectors
export const selectUserToken = (state) => state.user.token;
export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserId = (state) => state.user.id;
export const selectUserEmail = (state) => state.user.email;
export const selectUserRole = (state) => state.user.role;

export default userSlice.reducer; 