import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from ".";

import useAuth from "../../hook/useAuth";

export const useUserAccount = () => {
  const address = useSelector(
    (state: { userAccount: { address: any } }) => state.userAccount.address
  );
  const dispatch = useDispatch();

  const { handleLogin, handleLogout } = useAuth();

  const loginMetamask = async () => {
    if (address === undefined) {
      if (window?.ethereum?.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = Web3.utils.toChecksumAddress(accounts[0]);
        await handleLogin(account);
        dispatch(addItem(account));
      }
    } else {
      dispatch(removeItem());
      handleLogout();
    }
  };

  const changeMetamaskAccount = async () => {
    if (window?.ethereum?.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = Web3.utils.toChecksumAddress(accounts[0]);
      await handleLogin(account);
      dispatch(addItem(account));
    }
  }

  const logoutMetamask = async () => {
    dispatch(removeItem());
    handleLogout();
  }

  return {
    address,
    loginMetamask,
    changeMetamaskAccount,
    logoutMetamask
  };
};
