import axios from "axios";
import Web3 from "web3";

import { baseUrl } from "../config";

const useAuth = (): any => {
  const handleLogin = async (address: string): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${baseUrl}/auth/message?address=${address}`
      );

      const messageToSign = response.data.response.messageToSign;

      if (!messageToSign) {
        throw new Error("Invalid message to sign");
      }

      const web3 = new Web3(Web3.givenProvider);
      const signature = await web3.eth.personal.sign(
        messageToSign,
        address,
        "123456"
      );

      const jwtResponse = await axios.get(
        `${baseUrl}/auth/jwt?address=${address}&signature=${signature}`
      );

      const [accessToken, refreshToken] = [
        jwtResponse?.data?.response.accessToken,
        jwtResponse?.data?.response.refreshToken,
      ];
      console.log({ accessToken, refreshToken });
      if (!accessToken && !refreshToken) {
        throw new Error("Invalid JWT");
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    handleLogin,
  };
};

export default useAuth;
