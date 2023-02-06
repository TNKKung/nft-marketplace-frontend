import axios from "axios";
import Web3 from "web3";

import { auth } from "../utils/firebase";
import { baseUrl } from "../config";
import { signOut } from "firebase/auth";
import { useJWToken } from "../store/JWTAction/hook";
import { useSelector } from "react-redux"

const useAuth = (): any => {

  const address = useSelector(
    (state: { userAccount: { address: any } }) => state.userAccount.address
  );

  const { refreshJWToken, setRefreshJWToken } = useJWToken();
  const web3 = new Web3(Web3.givenProvider);

  const handleLogin = async (addressWallet: string): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${baseUrl}/auth/message?address=${addressWallet}`
      );
      const messageToSign = response.data.response.messageToSign;
      if (!messageToSign) {
        throw new Error("Invalid message to sign");
      }
      const signature = await web3.eth.personal.sign(
        messageToSign,
        addressWallet,
        "123456"
      );

      const jwtResponse = await axios.get(
        `${baseUrl}/auth/jwt?address=${addressWallet}&signature=${signature}`
      );
      console.log("data = "+jwtResponse);

      const [accessToken, refreshToken] = [
        jwtResponse?.data?.response.accessToken,
        jwtResponse?.data?.response.refreshToken,
      ];
      console.log({ accessToken, refreshToken });
      if (!accessToken && !refreshToken) {
        throw new Error("Invalid JWT");
      }else{
        setRefreshJWToken(refreshToken);
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const getAccessToken = async() => {
    const config = {
      headers: {
        authorization: "Bearer "+ refreshJWToken
      }
    }
     try{
      const getAccessTokenRes = await axios.get(
        `${baseUrl}/auth/requestAccessToken?address=${address}`,
        config
      );
      return getAccessTokenRes?.data?.response.accessToken

    }catch(error){
      console.log();
      
    }
  }

  const getConfig = async () => {
    const accessToken = await getAccessToken();
    const config = {
        headers: {
            authorization: accessToken
        }
    }
    return config
}

  return {
    handleLogin,
    handleLogout,
    getAccessToken,
    getConfig
  };
};

export default useAuth;
