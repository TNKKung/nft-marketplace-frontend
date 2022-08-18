import { configureStore } from "@reduxjs/toolkit";
import userAccount from "./UserAction"

const store = configureStore({
    reducer: {
        userAccount: userAccount
    }
})

export default store;