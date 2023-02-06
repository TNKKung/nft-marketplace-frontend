import { createSlice } from "@reduxjs/toolkit";
import { JWTProps } from "../type";

const jwtInit: JWTProps = {
    refreshJWT: ""
};

export const jwtSlice = createSlice({
    name: 'jwt',
    initialState: jwtInit,
    reducers: {
        addRefreshJWT: (state, action) => {
                state.refreshJWT = action.payload;
        },
    }

});

export const { addRefreshJWT } = jwtSlice.actions;
export default jwtSlice.reducer;
