import { useDispatch, useSelector } from "react-redux"
import { waitTransactionAction } from ".";

export const useTransactionAction = () => {
    const waitTransaction = useSelector(
        (state: { transactionRes: {waitTransactionState:boolean}}) => state.transactionRes.waitTransactionState
    );
    const dispatch = useDispatch();

    const setWaitTransaction = (state:boolean) => {
        dispatch(waitTransactionAction(state));
    }
    return {
        waitTransaction,
        setWaitTransaction
    }
}