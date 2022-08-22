import { collection, addDoc } from "firebase/firestore";

import { firestore } from "../utils/firebase";

const useAccount = (): any => {
  const createAccount = async (address: string): Promise<void> => {
    await addDoc(collection(firestore, "User"), {
      userAddress: address,
    });
  };
  return {
    createAccount,
  };
};

export default useAccount;
