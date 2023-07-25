import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // global state
  mode: "dark",
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
