import { createSlice } from "@reduxjs/toolkit";
import { TransactionResProps } from "../type";

const transactionRes: TransactionResProps = {
    waitTransactionState: false
};

export const transactionSlice = createSlice({
    name: 'transactionRes',
    initialState: transactionRes,
    reducers: {
        waitTransactionAction: (state, action) => {
                state.waitTransactionState = action.payload;
        },
    }

});

export const { waitTransactionAction } = transactionSlice.actions;
export default transactionSlice.reducer;
