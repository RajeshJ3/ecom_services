import { createSlice } from "@reduxjs/toolkit";

export const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    loading: false,
    activeTab: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setLoading, setNotify, setActiveTab } = utilsSlice.actions;

export default utilsSlice.reducer;
