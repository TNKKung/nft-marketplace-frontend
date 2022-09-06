import { ethers } from "ethers";
import axios from "axios";

import { CONTRACT_ADDRESS, baseUrl } from "../config";
import contractABI from "../config/abi.json";

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
      tokenId = await contract.getTokenCurrent();
    } catch (error) {
      console.log(error);
    }
    const response = await axios.post(`${baseUrl}/nft`, {
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
