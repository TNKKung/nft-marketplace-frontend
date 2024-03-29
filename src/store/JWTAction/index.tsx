import { createSlice } from "@reduxjs/toolkit";
import { JWTProps } from "../type";

const jwtInit: JWTProps = {
  refreshJWT: "",
};

export const jwtSlice = createSlice({
  name: "jwt",
  initialState: jwtInit,
  reducers: {
    addRefreshJWT: (
      state,
      { payload: { refresh } }: { payload: { refresh: string } }
    ) => {
      state.refreshJWT = refresh;
    },
    removeRefreshJWT: (state) => {
      state.refreshJWT = "";
    },
  },
});

export const { addRefreshJWT, removeRefreshJWT } = jwtSlice.actions;
export default jwtSlice.reducer;
