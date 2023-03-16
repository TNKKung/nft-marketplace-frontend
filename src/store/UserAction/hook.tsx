import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addProfileImg, removeItem } from ".";
import { removeRefreshJWT } from "../JWTAction";

import useAuth from "../../hook/useAuth";

export const useUserAccount = (): {
  profileImg: string;
  address: string;
  reducer: {
    loginMetamask: () => void;
    changeMetamaskAccount: () => void;
    logoutMetamask: () => void;
    changeImgProfile: (imageProfile: string) => void;
  };
} => {
  const address = useSelector(
    (state: { userAccount: { address: string } }) => state.userAccount.address
  );
  const profileImg = useSelector(
    (state: { userAccount: { profileImg: string } }) =>
      state.userAccount.profileImg
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
        const loginSuccess = await handleLogin(account);
        if (loginSuccess) dispatch(addItem({ address: account }));
        else {
          alert("Login unsuccess!");
        }
      }
    } else {
      dispatch(removeItem());
      dispatch(removeRefreshJWT());
      handleLogout();
    }
  };

  const changeMetamaskAccount = async () => {
    dispatch(removeItem());
    dispatch(removeRefreshJWT());
    handleLogout();
    if (window?.ethereum?.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = Web3.utils.toChecksumAddress(accounts[0]);
      const loginSuccess = await handleLogin(account);
      if (loginSuccess) dispatch(addItem({ address: account }));
      else {
        alert("Login unsuccess!");
      }
    }
  };

  const logoutMetamask = async () => {
    dispatch(removeItem());
    dispatch(removeRefreshJWT());
    handleLogout();
  };

  const changeImgProfile = async (imageProfile: string) => {
    dispatch(addProfileImg({ imageProfile }));
  };

  return {
    profileImg,
    address,
    reducer: {
      loginMetamask,
      changeMetamaskAccount,
      logoutMetamask,
      changeImgProfile,
    },
  };
};
