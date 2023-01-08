import axios from "axios";
import Web3 from "web3";

import { auth } from "../utils/firebase";
import { baseUrl } from "../config";
import { signInWithCustomToken, signOut } from "firebase/auth";

const useAuth = (): any => {
  const handleLogin = async (address: string): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${baseUrl}/auth/message?address=${address}`
      );

      const messageToSign = response.data.response.messageToSign;

      console.log(messageToSign);

      if (!messageToSign) {
        throw new Error("Invalid message to sign");
      }

      const web3 = new Web3(Web3.givenProvider);
      const signature = await web3.eth.personal.sign(
        messageToSign,
        address,
        "111"
      );

      const jwtResponse = await axios.get(
        `${baseUrl}/auth/jwt?address=${address}&signature=${signature}`
      );

      console.log(jwtResponse);

      const customToken = jwtResponse?.data?.response.customToken;

      console.log(customToken);

      if (!customToken) {
        throw new Error("Invalid JWT");
      }
      const res = await signInWithCustomToken(auth, customToken);
      console.log(res);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };
  return {
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
