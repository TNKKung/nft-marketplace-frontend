import { BigNumber, ethers } from "ethers";
import axios from "axios";

import { CONTRACT_ADDRESS, Market_ADDRESS, baseUrl, chainID } from "../config";
import contractABI from "../config/abi.json";
import contractMarketABI from "../config/abi2.json"

import { useTransactionAction } from "../store/TransactionAction/hook";

const useContracts = (): any => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  const contract_market = new ethers.Contract(Market_ADDRESS, contractMarketABI, signer);

  const { setWaitTransaction } = useTransactionAction();

  const changeNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainID }], //chainId 0x5 = Goerli Test Network
      });
    } catch (error) {
      console.log("Cancel switch chain");
    }
  };

  const mintNFT = async (
    nameNFT: string,
    description: string,
    category: any,
    collaborator: string[],
    collaboratorPercent: number[],
    uri: string,
    collection: string
  ) => {
    const address = await signer.getAddress();
    let tokenId;
    await changeNetwork();
    try {
      const tx = await contract.mint(collaborator, collaboratorPercent, uri);
      // "https://ipfs.pixura.io/ipfs/QmUyARmq5RUJk5zt7KUeaMLYB8SQbKHp3Gdqy5WSxRtPNa/SeaofRoses.jpg"
      setWaitTransaction(true);
      tokenId = await contract.getTokenCurrent();
      // console.log(Number(tokenCurrent) + 1);
      // console.log(collection);
      const response = await axios.post(`${baseUrl}/nft/`, {
        ownerAddres: address,
        nameNFT,
        description,
        tokenId: Number(tokenId) + 1,
        category,
        collectionId: collection,
      });
      console.log(response);
      await tx.wait();
      // console.log(receipt.logs);
      return Number(tokenId) + 1;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const readTokenURI = async (tokenId: string) => {
    const INTtokenID = parseInt(tokenId);
    const res = await contract.tokenURI(INTtokenID);
    return res;
  };

  const readOwnerTokenID = async (tokenId: string) => {
    const INTtokenID = parseInt(tokenId);
    const res = await contract.ownerOf(INTtokenID);
    return res;
  };

  const sellNFT = async (tokenId: string, price: number) => {
    const convertPrice = BigNumber.from(Number(price * 1e18).toString());
    try {
      const tx = await contract_market.listedNFTItem(CONTRACT_ADDRESS, Number(tokenId), convertPrice);
      await tx.wait();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const cancelSellNFT = async (tokenId: string) => {
    try {
      const itemFromTokenId = await contract_market.itemFromTokenId(tokenId);
      const tx = await contract_market.unListNFTItem(CONTRACT_ADDRESS, itemFromTokenId);
      await tx.wait();
      return true;
    } catch (error) {
      return false;
    }
  }

  const getPrice = async (tokenId: string) => {
    try {
      const price = await contract_market.priceFromTokenId(tokenId);
      return price;
    } catch (error) {
      return 0;
    }
  }

  const buyNFT = async (tokenId: string, idDocNFT: string) => {
    try {
      const price = await getPrice(tokenId);
      const itemID = await contract_market.itemFromTokenId(tokenId);
      const options0 = { value: ethers.utils.parseEther((Number(price) / 1e18).toString()) };
      const tx = await contract_market.saleNFTItem(CONTRACT_ADDRESS, itemID, options0);
      await tx.wait();
      await axios.patch(`${baseUrl}/nft/updateOwner`, {
        id: idDocNFT,
        contract: CONTRACT_ADDRESS
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const getNFTforSaleList = async () => {
    try {
      const itemList = await contract_market.fetchNFTItems();
      return itemList;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  return {
    readTokenURI,
    readOwnerTokenID,
    mintNFT,
    sellNFT,
    buyNFT,
    cancelSellNFT,
    getPrice,
    getNFTforSaleList
  };
};

export default useContracts;
