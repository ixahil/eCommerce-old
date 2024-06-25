import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },

  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    removeUserProfile: (state, action) => {
      state.profile = null;
    },
  },
});

// Export actions
export const { setUserProfile, removeUserProfile } = profileSlice.actions;

// Selectors
export const profileSelector = (state) => state.profile;

export default profileSlice;
