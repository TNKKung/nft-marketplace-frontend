import { createSlice } from "@reduxjs/toolkit";
import { userAccountProps } from "../type";

const userAccount: userAccountProps = {
    address: undefined,
    profileImg: ""
};

export const userSlice = createSlice({
    name: 'userAccount',
    initialState: userAccount,
    reducers: {
        addItem: (state, action) => {
            state.address = action.payload;
        },
        addProfileImg: (state, action) => {
            state.profileImg = action.payload;
        },
        removeItem: (state) => {
            state.address = undefined;
        }
    }

});

export const { addItem, removeItem, addProfileImg } = userSlice.actions;
export default userSlice.reducer;
