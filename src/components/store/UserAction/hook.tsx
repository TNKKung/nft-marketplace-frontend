import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from ".";

export const useUserAccount = () => {
    const address = useSelector((state: { userAccount: { address: any; }; }) => state.userAccount.address);
    const dispatch = useDispatch();

    const loginMetamask = () => {
        if (address == undefined) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((res: any) => {
                    // Return the address of the wallet
                    dispatch(addItem(res[0]));
                });
        } else {
            dispatch(removeItem());
        }
    }

    return {
        address,
        loginMetamask
    }
};