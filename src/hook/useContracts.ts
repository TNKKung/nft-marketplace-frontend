import { ethers } from "ethers";

import { CONTRACT_ADDRESS } from "../config/config";
import contractABI from "../config/abi.json";
import axios from "axios";

const useContracts = (): any => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  const mintNFT = async (
    nameNFT: string,
    description: string,
    category: any,
    collaborator: string[],
    collaboratorPercent: number[],
    uri: string
  ) => {
    const address = await signer.getAddress();
    let tokenId;
    try {
      await contract.mint(address, collaborator, collaboratorPercent, uri);
      // "https://ipfs.pixura.io/ipfs/QmUyARmq5RUJk5zt7KUeaMLYB8SQbKHp3Gdqy5WSxRtPNa/SeaofRoses.jpg"
      tokenId = await contract.getTokenCurrent();
    } catch (error) {
      console.log(error);
    }
    // console.log(Number(tokenCurrent) + 1);
    const response = await axios.post("http://localhost:4000/createNFT", {
      owner: address,
      nameNFT,
      description,
      tokenId: Number(tokenId) + 1,
      category,
    });
    console.log(response);
  };

  const readTokenURI = async () => {
    const res = await contract.tokenURI(1);
    console.log(res);
  };

  return {
    readTokenURI,
    mintNFT,
  };
};

export default useContracts;
