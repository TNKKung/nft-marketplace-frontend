import { createSlice } from "@reduxjs/toolkit";
import { userAccountProps } from "../type";

const userAccount: userAccountProps = {
    address: undefined
};

export const userSlice = createSlice({
    name: 'userAccount',
    initialState: userAccount,
    reducers: {
        addItem: (state, action) => {
                state.address = action.payload;
        },
        removeItem:(state) =>{
            state.address = undefined;
        }
    }

});

export const { addItem, removeItem } = userSlice.actions;
export default userSlice.reducer;
