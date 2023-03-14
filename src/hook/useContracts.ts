import { BigNumber, ethers, providers } from "ethers";
import axios from "axios";

import { CONTRACT_ADDRESS, Market_ADDRESS, baseUrl, chainID } from "../config";
import contractABI from "../config/abi.json";
import contractMarketABI from "../config/abi2.json";

import { useTransactionAction } from "../store/TransactionAction/hook";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

const useContracts = (): any => {
  const { getConfig } = useAuth();
  const [signer, setSigner] = useState<providers.JsonRpcSigner>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [contract_market, setContract_market] = useState<ethers.Contract>();

  const getContractConfig = (): any => {
    const provider = new providers.Web3Provider(window.ethereum);
    const getSigner = provider.getSigner();
    const nft_contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractABI,
      getSigner
    );
    const market_contract = new ethers.Contract(
      Market_ADDRESS,
      contractMarketABI,
      getSigner
    );
    return { getSigner, nft_contract, market_contract };
  };

  useEffect(() => {
    try {
      const contractConfig = getContractConfig();
      setSigner(contractConfig.getSigner);
      setContract(contractConfig.nft_contract);
      setContract_market(contractConfig.market_contract);
    } catch (e) {}
    // eslint-disable-next-line
  }, []);

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
    if (contract !== undefined && signer !== undefined) {
      const address = await signer.getAddress();
      let tokenId;
      await changeNetwork();
      try {
        const tx = await contract.mint(collaborator, collaboratorPercent, uri);
        // "https://ipfs.pixura.io/ipfs/QmUyARmq5RUJk5zt7KUeaMLYB8SQbKHp3Gdqy5WSxRtPNa/SeaofRoses.jpg"
        setWaitTransaction(true);
        await tx.wait();
        console.log(tx);
        tokenId = await contract.getTokenCurrent();
        // console.log(Number(tokenCurrent) + 1);
        // console.log(collection);
        const config = await getConfig();
        const response = await axios.post(
          `${baseUrl}/nft/`,
          {
            ownerAddress: address,
            nameNFT,
            description,
            tokenId: Number(tokenId),
            category,
            collectionId: collection,
            transactionHash: tx.hash,
          },
          config
        );
        console.log(response);
        // console.log(receipt.logs);
        return Number(tokenId);
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  };

  const readTokenURI = async (tokenId: string) => {
    const INTtokenID = parseInt(tokenId);
    if (contract !== undefined) {
      const res = await contract.tokenURI(INTtokenID);
      return res;
    } else {
      try {
        const getContract = getContractConfig();
        const res = await getContract.nft_contract.tokenURI(INTtokenID);
        return res;
      } catch (e) {
        return null;
      }
    }
  };

  const readOwnerTokenID = async (tokenId: string) => {
    const INTtokenID = parseInt(tokenId);
    if (contract !== undefined) {
      const res = await contract.ownerOf(INTtokenID);
      return res;
    } else {
      try {
        const getContract = getContractConfig();
        const res = await getContract.nft_contract.ownerOf(INTtokenID);
        return res;
      } catch (e) {
        return null;
      }
    }
  };

  const readCollabPercent = async (tokenId: string) => {
    const INTtokenID = parseInt(tokenId);
    if (contract !== undefined) {
      const res = await contract.collaboratotPercentageOf(INTtokenID);
      let CollabPercent = 0;
      res.forEach((value: BigNumber) => {
        CollabPercent += value.toNumber();
      });
      return CollabPercent;
    } else {
      try {
        const getContract = getContractConfig();
        const res = await getContract.nft_contract.collaboratotPercentageOf(
          INTtokenID
        );
        let CollabPercent = 0;
        res.forEach((value: BigNumber) => {
          CollabPercent += value.toNumber();
        });
        return CollabPercent;
      } catch (e) {
        return null;
      }
    }
  };

  const sellNFT = async (tokenId: string, price: number, idDocNFT: string) => {
    const convertPrice = BigNumber.from(Number(price * 1e18).toString());
    console.log(convertPrice);
    if (contract_market !== undefined && signer !== undefined) {
      try {
        const address = await signer.getAddress();
        const config = await getConfig();
        const tx = await contract_market.listedNFTItem(
          CONTRACT_ADDRESS,
          Number(tokenId),
          convertPrice
        );
        setWaitTransaction(true);
        await tx.wait();
        await axios.patch(
          `${baseUrl}/nft/listingForSale?ownerAddress=${address}`,
          {
            id: idDocNFT,
          },
          config
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  };

  const cancelSellNFT = async (tokenId: string, idDocNFT: string) => {
    if (contract_market !== undefined && signer !== undefined) {
      try {
        const address = await signer.getAddress();
        const config = await getConfig();
        const itemFromTokenId = await contract_market.itemFromTokenId(tokenId);
        const tx = await contract_market.unListNFTItem(
          CONTRACT_ADDRESS,
          itemFromTokenId
        );
        setWaitTransaction(true);
        await tx.wait();
        await axios.patch(
          `${baseUrl}/nft/unlistingForSale?ownerAddress=${address}`,
          {
            id: idDocNFT,
          },
          config
        );
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  };

  const getPrice = async (tokenId: string) => {
    if (contract_market !== undefined) {
      try {
        const price = await contract_market.priceFromTokenId(tokenId);
        return price;
      } catch (error) {
        return 0;
      }
    } else {
      try {
        const getContract = getContractConfig();
        const price = await getContract.market_contract.priceFromTokenId(
          tokenId
        );
        return price;
      } catch (e) {
        return 0;
      }
    }
  };

  const buyNFT = async (tokenId: string, idDocNFT: string) => {
    if (contract_market !== undefined) {
      try {
        const config = await getConfig();
        const price = await getPrice(tokenId);
        const itemID = await contract_market.itemFromTokenId(tokenId);
        const options0 = {
          value: ethers.utils.parseEther((Number(price) / 1e18).toString()),
        };
        const tx = await contract_market.saleNFTItem(
          CONTRACT_ADDRESS,
          itemID,
          options0
        );
        setWaitTransaction(true);
        await tx.wait();
        await axios.patch(
          `${baseUrl}/nft/updateOwner`,
          {
            id: idDocNFT,
            contract: CONTRACT_ADDRESS,
          },
          config
        );
        await axios.patch(
          `${baseUrl}/nft/unlistingForSale`,
          {
            id: idDocNFT,
          },
          config
        );
        await axios.post(
          `${baseUrl}/nft/addTransactionHash`,
          {
            id: idDocNFT,
            transactionHash: tx.hash,
          },
          config
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  };

  const getNFTforSaleList = async () => {
    if (contract_market !== undefined) {
      try {
        const itemList = await contract_market.fetchNFTItems();
        return itemList;
      } catch (error) {
        console.log(error);
        return {};
      }
    } else {
      return {};
    }
  };

  return {
    readTokenURI,
    readOwnerTokenID,
    mintNFT,
    sellNFT,
    buyNFT,
    cancelSellNFT,
    getPrice,
    getNFTforSaleList,
    readCollabPercent,
  };
};

export default useContracts;
