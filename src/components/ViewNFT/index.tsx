import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useContracts from "../../hook/useContracts";
import useBackend from "../../hook/useBackend";
import {
  CONTRACT_ADDRESS,
  blockchainName,
  // Market_ADDRESS
} from "../../config";
import "./viewNFT.css";
import { shortenAddress } from "../../utils/addressHelper";
import { weiToEther } from "../../utils/costHelper";
import { useUserAccount } from "../../store/UserAction/hook";

import WaitTransactionModal from "../WaitTransaction";
import { useTransactionAction } from "../../store/TransactionAction/hook";
import useCollection from "../../hook/useCollection";

const ViewNFT: React.FC = () => {
  const params = useParams();
  const { address } = useUserAccount();
  let navigate = useNavigate();

  const { setWaitTransaction } = useTransactionAction();

  const [saleNFTStatus, setSaleNFTStatus] = useState(false);
  const [URLImage, setURLImage] = useState();
  const [nftDocument, setNFTDocument] = useState<string>("");
  const [nftName, setNFTName] = useState<string>("");
  const [nftDescription, setNFTDescription] = useState<string>("");
  const [ownerNFTAddress, setOwnerNFTAddress] = useState<string>(
    "0x0000000000000000000000000000000000000000"
  );
  const [nftCreator, setNftCreator] = useState<[]>([]);
  const [nftCollection, setNftCollection] = useState<any>(undefined);
  const [nftCategory, setNftCategory] = useState<any[]>([]);
  const [nftCost, setNFTCost] = useState(0);
  const [nftTransaction, setNftTransaction] = useState<any[]>([]);
  const {
    buyNFT,
    cancelSellNFT,
    getPrice,
  } = useContracts();
  const {
    readTokenIdData,
    checkLikeNFT,
    addLikeNFT,
    removeLikeNFT,
    getAllTransaction,
  } = useBackend();
  const {
    getCollectionbyId
  } = useCollection();


  const [loadingClass, setLoadingClass] = useState("");
  const [mainClass1, setMainClass1] = useState("d-none");

  const [confirmModal, setConfirmModal] = useState(false);

  const handlePathOwner = useCallback(
    (walletAddress: string) => {
      navigate("/profile/" + walletAddress);
    },
    [navigate]
  );

  const [likeNft, setLikeNft] = useState(false);
  const handleLikeNFT = useCallback(async () => {
    if (likeNft === false) {
      setLikeNft(true);
      addLikeNFT(params.tokenID, address);
    } else {
      setLikeNft(false);
      removeLikeNFT(params.tokenID, address);
    }
  }, [likeNft, addLikeNFT, removeLikeNFT, address, params]);

  const fetchData = useCallback(async () => {
    // const TokenURI = await readTokenURI(params.tokenID);
    // setURLImage(TokenURI);
    // const realOwnerAddress = await readOwnerTokenID(params.tokenID);
    // if (realOwnerAddress === Market_ADDRESS) {
    //     setSaleNFTStatus(true);
    //     try {
    //         const weiCost = await getPrice(params.tokenID);
    //         setNFTCost(weiToEther(weiCost));
    //     } catch (Error) {
    //         console.log(Error);
    //     }

    // } else {
    //     setSaleNFTStatus(false);
    // }

    const DataDetail = await readTokenIdData(params.tokenID);
    console.log(DataDetail);
    try {
      setNFTName(DataDetail.nameNFT);
      setNFTDescription(DataDetail.description);
      setOwnerNFTAddress(DataDetail.ownerAddress);
      setNFTDocument(DataDetail.id);
      setURLImage(DataDetail.tokenURI);
      setNftCategory(DataDetail.category);
      setNftCreator(DataDetail.createdCollaborator);

      if (DataDetail.statusSale === true) {
        setSaleNFTStatus(true);
        try {
          const weiCost = await getPrice(params.tokenID);
          setNFTCost(weiToEther(weiCost));
        } catch (Error) {
          console.log(Error);
        }
      } else {
        setSaleNFTStatus(false);
      }

      if (DataDetail.collectionId !== "" || DataDetail.collectionId !== "none") {
        try {
          const collectionRes = await getCollectionbyId(DataDetail.collectionId);
          setNftCollection(collectionRes);
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      setNFTName("Name NFT");
      setNFTDescription("");
    }
    setLoadingClass("d-none");
    setMainClass1("d-flex");

    setLikeNft(await checkLikeNFT(params.tokenID, address));
    const transactionRes = await getAllTransaction(DataDetail.id);
    try {
      setNftTransaction(transactionRes);
      console.log(transactionRes);
    } catch (error) {
      console.log(error);
    }
  }, [
    params.tokenID,
    // readTokenURI,
    // readOwnerTokenID,
    readTokenIdData,
    getPrice,
    checkLikeNFT,
    address,
    getAllTransaction,
    getCollectionbyId
  ]);

  const handleBuyNFT = useCallback(async () => {
    setConfirmModal(true);
    const buyNFTStatus = await buyNFT(params.tokenID, nftDocument);
    if (buyNFTStatus === true) {
      fetchData();
      setWaitTransaction(false);
    } else {
      setConfirmModal(false);
    }
  }, [params.tokenID, buyNFT, fetchData, nftDocument, setWaitTransaction]);

  const handleCancelSellNFT = useCallback(async () => {
    setConfirmModal(true);
    const cancelStatus = await cancelSellNFT(params.tokenID, nftDocument);
    if (cancelStatus === true) {
      fetchData();
      setWaitTransaction(false);
    } else {
      setConfirmModal(false);
    }
  }, [
    params.tokenID,
    cancelSellNFT,
    fetchData,
    nftDocument,
    setWaitTransaction,
  ]);

  const [descriptionClass, setDescriptionClass] = useState(["", "-down"]);
  const [detailsClass, setDetailsClass] = useState(["", "-down"]);
  const [creatorClass, setCreatorClass] = useState(["show", "-up"])

  const handleDesciption = useCallback(() => {
    if (descriptionClass[0] === "") {
      setDescriptionClass(["show", "-up"]);
    } else {
      setDescriptionClass(["", "-down"]);
    }
  }, [descriptionClass]);

  const handleDetails = useCallback(() => {
    if (detailsClass[0] === "") {
      setDetailsClass(["show", "-up"]);
    } else {
      setDetailsClass(["", "-down"]);
    }
  }, [detailsClass]);

  const handleCreator = useCallback(() => {
    if (creatorClass[0] === "") {
      setCreatorClass(["show", "-up"]);
    } else {
      setCreatorClass(["", "-down"]);
    }
  }, [creatorClass])

  const [mainClass2, setMainClass2] = useState(["", "w-50", false]);
  const [imageClass, setImageClass] = useState([
    "justify-content-end",
    "col-7",
  ]);
  const [rightDetailClass, setRightDetailClass] = useState(["", "col-8"]);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 990) {
      setMainClass2(["", "w-50", false]);
      setImageClass(["justify-content-end", "col-7"]);
      setRightDetailClass(["", "col-8"]);
    } else {
      setMainClass2(["flex-column", "w-75", true]);
      setImageClass(["justify-content-center", "col-12"]);
      setRightDetailClass(["justify-content-center", "col-12"]);
    }
  }, []);

  useEffect(() => {
    handleResize();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tokenID]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div>
      <div
        className={
          "container-fluid mt-5 d-flex justify-content-center " + loadingClass
        }
      >
        <div className="spinner-border viewNFT_loading" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div
        className={"container-fluid mt-5 " + mainClass1 + " " + mainClass2[0]}
      >
        <div className={"container-fluid " + mainClass2[1]}>
          <div className={mainClass2[2] === false ? "d-none" : ""}>
            <div className="row justify-content-between align-items-top">
              <div className="col-10">
                <div className="flex flex-column">
                  {nftCollection === undefined ? null :
                    <Link to={`/collection/${nftCollection.collectionId}`} className="h4 text-break text-black">
                      {nftCollection.collectionName}</Link>
                  }

                  <div className="h5 text-break">{nftName}</div>
                </div>
              </div>
              <div
                className="col-auto viewNFT_cursor_pointer"
                onClick={handleLikeNFT}
              >
                {address === undefined ? null :
                  likeNft === false ? (
                    <i className="h4 bi bi-heart "></i>
                  ) : (
                    <i className="h4 bi bi-heart-fill"></i>
                  )}
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-auto">Owner by</div>
              <div
                className="col viewNFT_address_path viewNFT_cursor_pointer"
                onClick={() => handlePathOwner(ownerNFTAddress)}
              >
                {ownerNFTAddress ===
                  "0x0000000000000000000000000000000000000000"
                  ? ""
                  : shortenAddress(ownerNFTAddress)}
              </div>
            </div>
            <div className="mb-3 row mt-1">
              {nftCategory.map((category, index) =>
                <div className="col-auto border rounded mx-2" key={index}>
                  {category.label}
                </div>)}

            </div>
          </div>
          <div className={"row " + imageClass[0]}>
            <div className={imageClass[1]}>
              <img
                className={"img-thumbnail viewNFT_cursor_pointer"}
                src={URLImage}
                alt="ImageNFT"
              ></img>
            </div>
          </div>
          <div className={"row my-3 " + imageClass[0]}>
            <div className={imageClass[1]}>
              <div className="border rounded container-fluid">
                <div
                  className="row justify-content-between viewNFT_cursor_pointer border-bottom"
                  onClick={handleCreator}
                >
                  <div className="col-auto my-2 h5 text-start">
                    <i className="bi bi-body-text"></i> Creator
                  </div>
                  <div className="col-auto my-2 h5 text-start">
                    <i className={"bi bi-chevron" + creatorClass[1]}></i>
                  </div>
                </div>

                <div className={"row collapse" + creatorClass[0]}>
                  <div className="px-0 col-12">
                    <div className="py-2 bg-gray-100 container-fluid border-bottom">
                      {nftCreator.map((nftCreator, index) =>
                        <div className="py-1 row justify-content-between align-items-center">
                          <div className="col-auto h6 mb-0">Creator {index + 1}</div>
                          <Link to={`/profile/${nftCreator}`} className="col-auto text-break text-black">
                            {shortenAddress(nftCreator)}
                          </Link>
                        </div>)}
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-content-between viewNFT_cursor_pointer border-bottom"
                  onClick={handleDesciption}
                >
                  <div className="col-auto my-2 h5 text-start">
                    <i className="bi bi-body-text"></i> Description
                  </div>
                  <div className="col-auto my-2 h5 text-start">
                    <i className={"bi bi-chevron" + descriptionClass[1]}></i>
                  </div>
                </div>

                <div className={"row collapse" + descriptionClass[0]}>
                  <div className="px-0 col-12">
                    <div className="py-2 bg-gray-100 container-fluid border-bottom">
                      <div className="py-1 row">
                        <div className="col-auto">{nftDescription}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-content-between viewNFT_cursor_pointer"
                  onClick={handleDetails}
                >
                  <div className="col-auto my-2 h5 text-start">
                    <i className="bi bi-card-text"></i> Details
                  </div>
                  <div className="col-auto my-2 h5 text-start">
                    <i className={"bi bi-chevron" + detailsClass[1]}></i>
                  </div>
                </div>

                <div className={"row collapse" + detailsClass[0]}>
                  <div className="px-0 col-12">
                    <div className="py-2 bg-gray-100 container-fluid border-bottom">
                      <div className="py-1 row justify-content-between">
                        <div className="col h6">Contract Address</div>
                        <div className="col-auto">
                          {shortenAddress(CONTRACT_ADDRESS)}
                        </div>
                      </div>
                      <div className="py-1 row justify-content-between">
                        <div className="col h6">TokenID</div>
                        <div className="col-auto">{params.tokenID}</div>
                      </div>
                      <div className="py-1 row justify-content-between">
                        <div className="col h6">Token standard</div>
                        <div className="col-auto">ERC-721</div>
                      </div>
                      <div className="py-1 row justify-content-between">
                        <div className="col h6">Blockchain</div>
                        <div className="col-auto">{blockchainName}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"container-fluid " + mainClass2[1]}>
          <div className={"row " + rightDetailClass[0]}>
            <div className={rightDetailClass[1]}>
              <div className="container-fluid">
                <div className={mainClass2[2] === false ? "" : "d-none"}>
                  <div className="row justify-content-between align-items-top">
                    <div className="col-10">
                      <div className="flex flex-column">
                        {nftCollection === undefined ? null :
                          <Link to={`/collection/${nftCollection.collectionId}`} className="h4 text-break text-black">
                            {nftCollection.collectionName}</Link>
                        }

                        <div className="h5 text-break">{nftName}</div>
                      </div>
                    </div>
                    <div
                      className="col-auto viewNFT_cursor_pointer"
                      onClick={handleLikeNFT}
                    >
                      {address === undefined ? null :
                        likeNft === false ? (
                          <i className="h4 bi bi-heart "></i>
                        ) : (
                          <i className="h4 bi bi-heart-fill"></i>
                        )}
                    </div>
                  </div>
                  <hr className="mt-0 mb-1"></hr>
                  <div className="row">
                    <div className="col-auto">Owner by</div>
                    <div
                      className="col-auto viewNFT_address_path viewNFT_cursor_pointer"
                      onClick={() => handlePathOwner(ownerNFTAddress)}
                    >
                      {ownerNFTAddress ===
                        "0x0000000000000000000000000000000000000000"
                        ? ""
                        : shortenAddress(ownerNFTAddress)}
                    </div>
                  </div>
                  <div className="row mt-1">
                    {nftCategory.map((category, index) =>
                      <div className="col-auto border rounded mx-2" key={index}>
                        {category.label}
                      </div>)}
                  </div>
                </div>
                <div className="mt-3 row">
                  <div className="px-0 col-12">
                    <div className="py-2 border rounded contrainer bg-gray-50">
                      {address === ownerNFTAddress ? (
                        saleNFTStatus === false ? (
                          <div className="px-3 row justify-content-end align-items-center">
                            <div className="col-auto">
                              <Link
                                to={"/sellNFT/" + params.tokenID}
                                className="btn btn-secondary"
                              >
                                Sell
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="px-3 row justify-content-between align-items-center">
                            <div className="col-auto mb-0 h5">
                              {nftCost} {blockchainName}ETH
                            </div>
                            <div className="col-auto">
                              <button
                                className="btn btn-secondary"
                                onClick={handleCancelSellNFT}
                              >
                                Cancel sell
                              </button>
                            </div>
                          </div>
                        )
                      ) : saleNFTStatus === false ? (
                        <div className="px-3 row justify-content-end align-items-center">
                          <div className="col-auto">
                            <button className="btn btn-secondary" disabled>
                              Buy
                            </button>
                          </div>
                        </div>
                      ) : address === undefined ? (
                        <div className="px-3 row justify-content-end align-items-center">
                          <div className="col-auto">
                            <button className="btn btn-secondary" disabled>
                              Buy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="px-3 row justify-content-between align-items-center">
                          <div className="col-auto mb-0 h5">
                            {nftCost} {blockchainName}ETH
                          </div>
                          <div className="col-auto">
                            <button
                              className="btn btn-secondary"
                              onClick={handleBuyNFT}
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-1 row">
                  <div className="col-auto h5">Transaction</div>
                </div>
                <div className="row">
                  <table className="table w-100">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col" className="w-auto ps-3">
                          Event
                        </th>
                        <th scope="col" className="w-25">
                          Price(ETH)
                        </th>
                        <th scope="col" className="w-25">
                          Owner
                        </th>
                        <th scope="col" className="w-auto">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...nftTransaction]
                        .reverse().slice(0, 4)
                        .map((transaction, index) => (
                          <tr key={index}>
                            <td className="w-auto ps-3">{transaction.event}</td>
                            <td>
                              {!isNaN(transaction.eventData.price)
                                ? transaction.eventData.price /
                                1000000000000000000
                                : ""}
                            </td>
                            <td>
                              <div
                                className="viewNFT_cursor_pointer viewNFT_address_path"
                                onClick={() =>
                                  handlePathOwner(transaction.eventData.owner)
                                }
                              >
                                {shortenAddress(transaction.eventData.owner)}
                              </div>
                            </td>
                            <td>
                              {transaction.date} {transaction.time}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WaitTransactionModal
        popupState={confirmModal}
        setPopup={setConfirmModal}
      ></WaitTransactionModal>
    </div>
  );
};
export default ViewNFT;
