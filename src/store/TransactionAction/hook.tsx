import { useDispatch, useSelector } from "react-redux";
import { waitTransactionAction } from ".";

export const useTransactionAction = (): {
  waitTransaction: boolean;
  reducer: { setWaitTransaction: (status: boolean) => void };
} => {
  const waitTransaction = useSelector(
    (state: { transactionRes: { waitTransactionState: boolean } }) =>
      state.transactionRes.waitTransactionState
  );
  const dispatch = useDispatch();

  const setWaitTransaction = (status: boolean) => {
    dispatch(waitTransactionAction({ status }));
  };
  return {
    waitTransaction,
    reducer: { setWaitTransaction },
  };
};
