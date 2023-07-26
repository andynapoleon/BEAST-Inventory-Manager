import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // global state
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      // controlling the mode (global state)
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions; // we're grabbing the function and export it

export default globalSlice.reducer;
