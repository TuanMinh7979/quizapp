import { createSlice } from "@reduxjs/toolkit";
 
const loadersSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: false,
    currentSubject: "T"
  },
  reducers: {
    SetLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetCurrentSubJect: (state, action) => {
      state.currentSubject = action.payload;
    },
  },
});
export const { SetLoading , SetCurrentSubJect} = loadersSlice.actions;
export default loadersSlice.reducer;
