import { createSlice } from "@reduxjs/toolkit";
import { userAccountProps } from "../type";

const userAccount: userAccountProps = {
  address: undefined,
  profileImg: "",
};

export const userSlice = createSlice({
  name: "userAccount",
  initialState: userAccount,
  reducers: {
    addItem: (
      state,
      { payload: { address } }: { payload: { address: string } }
    ) => {
      state.address = address;
    },
    addProfileImg: (
      state,
      { payload: { imageProfile } }: { payload: { imageProfile: string } }
    ) => {
      state.profileImg = imageProfile;
    },
    removeItem: (state) => {
      state.address = undefined;
    },
  },
});

export const { addItem, removeItem, addProfileImg } = userSlice.actions;
export default userSlice.reducer;
