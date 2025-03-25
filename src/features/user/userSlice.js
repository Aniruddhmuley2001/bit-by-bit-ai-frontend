import { createSlice } from '@reduxjs/toolkit';

// Initial state - try to load from localStorage first
const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return {
        email: null,
        photoUrl: null,
        username: null,
        isAuthenticated: false
      };
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    return {
      email: null,
      photoUrl: null,
      username: null,
      isAuthenticated: false
    };
  }
};

const initialState = loadUserFromStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { email, photoUrl, username } = action.payload;
      state.email = email;
      state.photoUrl = photoUrl;
      state.username = username;
      state.isAuthenticated = true;
      
      localStorage.setItem('user', JSON.stringify({
        email,
        photoUrl,
        username,
        isAuthenticated: true
      }));

      console.log(localStorage.getItem('user'));
    },
    clearUserDetails: (state) => {
      state.email = null;
      state.photoUrl = null;
      state.username = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem('user');
    }
  }
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectphotoUrl = (state) => state.user.photoUrl;
export const selectUserEmail = (state) => state.user.email;
export const selectUsername = (state) => state.user.username;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

// Change this line to export the reducer
export default userSlice.reducer;  // Make sure this line exists!