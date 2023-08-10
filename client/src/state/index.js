import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // global state
  mode: "dark",
  userId: null,
  token: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      // controlling the mode (global state)
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setMode, setLogin, setLogout } = globalSlice.actions; // we're grabbing the function and export it

export default globalSlice.reducer;
