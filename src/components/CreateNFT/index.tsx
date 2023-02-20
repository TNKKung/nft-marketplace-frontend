import React, { useState, useCallback, useEffect, useRef } from "react";
import Select, { MultiValue, SingleValue } from "react-select";

import "./createNFT.css";

import CreatorRoyaltyFee from "./CreatorRoyaltyFee";
import WaitTransactionModal from "../WaitTransaction"

import { useUserAccount } from "../../store/UserAction/hook";
import { useTransactionAction } from "../../store/TransactionAction/hook";
import useIPFS from "../../hook/useIPFS";
import useContracts from "../../hook/useContracts";
import useAddress from "../../hook/useAddress";
import useCollection from "../../hook/useCollection";
import { useNavigate } from "react-router-dom";

const CreateNFT: React.FC = () => {
  const { address } = useUserAccount();
  const { setWaitTransaction } = useTransactionAction();
  const { mintNFT } = useContracts();
  const { getIPFS } = useIPFS();
  const { checkWalletAddress } = useAddress();
  const { getCollectionbyAddress } = useCollection();
  let navigate = useNavigate();

  const [imageNFT, setImageNFT] = useState([]);
  const [previewimageNFT, setPreviewImageNFT] = useState("");
  const [previewDisplay, setPreviewDisplay] = useState("d-none");
  const [previewDummyDisplay, setPreviewDummyDisplay] = useState("");
  const [inputFileClass, setInputFileClass] = useState("");

  const [nftName, setNftName] = useState("");
  const [pictureNameInputClass, setPictureNameInputClass] = useState("");
  const [pictureNameInvalidText, setPictureNameInvalidText] = useState("");

  const [nftDescription, setNftDescription] = useState("");
  const [descriptionInputClass, setDescriptionInputClass] = useState("");
  const [descriptionInvalidText, setDescriptionInvalidText] = useState("");

  const [selectedCategory, setselectedCategory] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);
  const categoryOptions = [
    { value: "artwork", label: "Artwork" },
    { value: "memes", label: "Memes" },
    { value: "photography", label: "Photography" },
    { value: "collections", label: "Collections" },
  ];

  const [selectedCollection, setSelectedCollection] = useState<SingleValue<{ value: string; label: string }>>({value: "",label: "..."});
  const [CollectionOptions, setCollectionOptions] = useState<any>([
    { value: " ", label: "..." },
  ]);

  const [creatorAddressList, setCreatorAddressList] = useState([]);
  const [royaltyTotal, setRoyaltyTotal] = useState<number>(0);

  const [creatorAddressInput, setCreatorAddressInput] = useState(address);
  const [creatorAddressClass, setCreatorAddressClass] = useState("");
  const [creatorEarnInput, setCreatorEarnInput] = useState<number>(0);
  const [creatorEarnClass, setCreatorEarnClass] = useState("");
  const [creatorInputValid, setCreatorInputValid] = useState("");

  const ImageInputRef = useRef<any>(null);

  const [confirmModal, setConfirmModal] = useState(false);

  const handleImageOnclick = () => {
    ImageInputRef.current?.click();
  };

  const handleOnSelectFile = (e: any) => {
    const selectedFiles = e.target.files[0];
    setImageNFT(selectedFiles);
    setInputFileClass("");
    try {
      setPreviewImageNFT(URL.createObjectURL(selectedFiles));
      setPreviewDisplay("");
      setPreviewDummyDisplay("d-none");
    } catch {
      setPreviewDisplay("d-none");
      setPreviewDummyDisplay("");
    }
  };

  const handleSetNftName = useCallback((e: any) => {
    setNftName(e.target.value);
    setPictureNameInputClass("");
  }, []);

  const handleSetNftDescription = useCallback((e: any) => {
    setNftDescription(e.target.value);
    setDescriptionInputClass("");
  }, []);

  const handleSetAddressInput = useCallback((e: any) => {
    setCreatorAddressInput(e.target.value);
    setCreatorAddressClass("");
    setCreatorEarnClass("");
  }, []);

  const handleSetCreatorEarnInput = useCallback((e: any) => {
    if (e.target.value !== "") {
      setCreatorEarnInput(e.target.valueAsNumber);
      setCreatorAddressClass("");
      setCreatorEarnClass("");
    }
  }, []);

  const handleAddCreator = () => {
    var TotalApprove = true;
    var creatorAddressApprove = true;
    var NewroyaltyTotal = royaltyTotal + creatorEarnInput;
    if (NewroyaltyTotal > 10) {
      TotalApprove = false;
      setCreatorAddressClass("is-invalid");
      setCreatorEarnClass("is-invalid");
      setCreatorInputValid("Max Total royalty fee 10%");
    }
    if (creatorAddressInput === "" || creatorAddressInput.length !== 42) {
      creatorAddressApprove = false;
      setCreatorAddressClass("is-invalid");
      setCreatorEarnClass("is-invalid");
      setCreatorInputValid("Please provide wallet");
    }
    const checkCreatorAddress = checkWalletAddress(creatorAddressInput);
    if (checkCreatorAddress === false) {
      creatorAddressApprove = false;
      setCreatorAddressClass("is-invalid");
      setCreatorEarnClass("is-invalid");
      setCreatorInputValid("Wallet not found");
    }
    if (creatorAddressList.length >= 2) {
      creatorAddressApprove = false;
      setCreatorAddressClass("is-invalid");
      setCreatorEarnClass("is-invalid");
      setCreatorInputValid("Max 2 creator");
    }
    if (creatorAddressApprove === true && TotalApprove === true) {
      var creatorData = {
        creatorAddress: creatorAddressInput,
        creatorEarn: creatorEarnInput,
      };
      var dummyCreatorAddressList: any = [...creatorAddressList];
      const checkEqual = dummyCreatorAddressList.some(
        (element: any) => element.creatorAddress === creatorData.creatorAddress
      );
      if (!checkEqual) {
        dummyCreatorAddressList.push(creatorData);
        setCreatorAddressList(dummyCreatorAddressList);
        setCreatorAddressInput("");
        setCreatorEarnInput(0);
        setRoyaltyTotal(NewroyaltyTotal);
      } else {
        setCreatorAddressClass("is-invalid");
        setCreatorEarnClass("is-invalid");
        setCreatorInputValid("Please provide another wallet");
      }
    }
  };

  const handleCreateNFT = useCallback(async () => {

    //Picture Name
    var nftNameApprove = true;
    if (nftName.length <= 0) {
      nftNameApprove = false;
      setPictureNameInputClass("is-invalid");
      setPictureNameInvalidText("Please provide picture name.");
    } else {
      if (nftName.length > 30) {
        nftNameApprove = false;
        setPictureNameInputClass("is-invalid");
        setPictureNameInvalidText(
          "Invalid input. Please enter name between 1-30"
        );
      }
    }
    //Description
    var nftDescriptionApprove = true;
    if (nftDescription.length > 100) {
      nftDescriptionApprove = false;
      setDescriptionInputClass("is-invalid");
      setDescriptionInvalidText(
        "Invalid input. Please enter name between 1-30"
      );
    }
    //Collection
    var collection: string | undefined = "";
    if (selectedCollection?.value === "") {
      collection = "none";
    } else {
      collection = selectedCollection?.value;
    }
    console.log(collection);

    //Image
    var nftImageApprove = true;
    try {
      if (imageNFT.length === 0) {
        nftImageApprove = false;
        setInputFileClass("is-invalid");
      }
    } catch {
      nftImageApprove = false;
      setInputFileClass("is-invalid");
    }

    if (
      nftNameApprove === true &&
      nftDescriptionApprove === true &&
      nftImageApprove === true
    ) {
      setConfirmModal(true);
      const collaborator = creatorAddressList.map(
        (item: any) => item.creatorAddress
      );
      const collaboratorPercent = creatorAddressList.map(
        (item: any) => item.creatorEarn
      );
      const CID = await getIPFS(imageNFT);
      if (CID !== false) {
        console.log(collaborator);
        console.log(collaboratorPercent);
        console.log(collection);
        var sentNftnftName = nftName;
        if (sentNftnftName === "") {
          sentNftnftName = " ";
        }
        var sentNftDescription = nftDescription;
        if (sentNftDescription === "") {
          sentNftDescription = " ";
        }

        const minNFTRes = await mintNFT(
          sentNftnftName,
          sentNftDescription,
          selectedCategory,
          collaborator,
          collaboratorPercent,
          CID,
          collection,
        );
        if (minNFTRes !== undefined) {
          setWaitTransaction(false);
          navigate("/viewNFT/" + minNFTRes)
        } else {
          setConfirmModal(false);
          setWaitTransaction(false);
        }
      }
    }
  }, [
    creatorAddressList,
    mintNFT,
    nftDescription,
    nftName,
    selectedCategory,
    getIPFS,
    imageNFT,
    selectedCollection,
    navigate,
    setWaitTransaction,
  ]);

  const [mClassUI, setMClassUI] = useState("flex-row");
  const [uploadMClassUI, setuploadMClassUI] = useState("justify-content-end");
  const [detailMClassUI, setDetailMClassUI] = useState("");
  const handleResize = useCallback(() => {
    if (window.innerWidth > 990) {
      setMClassUI("flex-row");
      setuploadMClassUI("justify-content-end");
      setDetailMClassUI("");
    } else {
      setMClassUI("flex-column");
      setuploadMClassUI("justify-content-center");
      setDetailMClassUI("justify-content-center");
    }
  }, []);

  const fetchDate = useCallback(async () => {
    const getMyCollection = await getCollectionbyAddress(address);
    var myCollectionOptions = [
      {
        value: "",
        label: "..."
      }
    ];
    for (let i = 0; i < getMyCollection.length; i++) {
      myCollectionOptions.push({
        value: getMyCollection[i].collectionId,
        label: getMyCollection[i].collectionName
      });
    }
    setCollectionOptions(myCollectionOptions);
  }, [
    getCollectionbyAddress,
    address
  ]);

  useEffect(() => {
    handleResize();
    fetchDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div>
      <div className="container-fluid my-5">
        <div className="row justify-content-center">
          <div className="col-auto">
            <h4>Create NFT</h4>
          </div>
        </div>
        <div className={"container-fluid mt-3 d-flex " + mClassUI}>
          <div className="container-fluid">
            <div className={"row " + uploadMClassUI}>
              <div className="col-6">
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-auto">
                      <h5>
                        Upload Image<span className="text-danger">*</span>
                      </h5>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <div className="form-text">Types supported: JPG, PNG</div>
                      <input
                        type="file"
                        ref={ImageInputRef}
                        accept="image/png, image/jpeg"
                        className={"form-control " + inputFileClass}
                        onChange={handleOnSelectFile}
                      ></input>
                      <div
                        id="validationPictureNameFeedback"
                        className="invalid-feedback"
                      >
                        Please upload image.
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 justify-content-center">
                    <div
                      className="col-12 createNFT_cursor_pointer"
                      onClick={handleImageOnclick}
                    >
                      <img
                        src={previewimageNFT}
                        className={"img-thumbnail " + previewDisplay}
                        alt="IMG"
                      />
                      <div
                        className={
                          "d-flex justify-content-center align-items-center rounded border-2 w-100 createNFT_dummyPicture " +
                          previewDummyDisplay
                        }
                      >
                        <i className="bi bi-image createNFT_IconImageSize"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className={"row " + detailMClassUI}>
              <div className="col-6 mb-3">
                <label htmlFor="pictureNameInput" className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  className={"form-control " + pictureNameInputClass}
                  id="pictureNameInput"
                  placeholder="Name"
                  type="text"
                  onChange={handleSetNftName}
                />
                <div
                  id="validationPictureNameFeedback"
                  className="invalid-feedback"
                >
                  {pictureNameInvalidText}
                </div>
              </div>
            </div>
            <div className={"row " + detailMClassUI}>
              <div className="col-6 mb-3">
                <label
                  htmlFor="descriptionInput"
                  className={"form-label " + descriptionInputClass}
                >
                  Description (optional)
                </label>
                <textarea
                  className="form-control"
                  id="descriptionInput"
                  onChange={handleSetNftDescription}
                ></textarea>
                <div
                  id="validationDescriptionFeedback"
                  className="invalid-feedback"
                >
                  {descriptionInvalidText}
                </div>
              </div>
            </div>
            <div className={"row mb-3 " + detailMClassUI}>
              <div className="col-6">
                <label className="form-label">
                  Category
                </label>
                <Select
                  onChange={setselectedCategory}
                  options={categoryOptions}
                  isMulti={true}
                />
              </div>
            </div>
            <div className={"row mb-3 " + detailMClassUI}>
              <div className="col-6">
                <label className="form-label">
                  Collection
                </label>
                <Select
                  onChange={setSelectedCollection}
                  options={CollectionOptions}
                  isMulti={false}
                />
              </div>
            </div>
            <div className={"row " + detailMClassUI}>
              <div
                className="col-8 py-2 border rounded"
                style={{ minWidth: "400px" }}
              >
                <div className="container-fluid">
                  <div className="row h5">Creator royalty fee (%)</div>
                  <div className="row form-text">Max total royalty fee 10%</div>
                  <div className="row h6 mt-2">Creator wallet address (Max : 2 Creator)</div>
                  <CreatorRoyaltyFee
                    creatorList={creatorAddressList}
                    setCreatorList={setCreatorAddressList}
                    setTotal={setRoyaltyTotal}
                  />
                  <div className="row mt-2 align-items-center">
                    <div className="col-9 text-end fw-bold">Total</div>
                    <div className="col-2 text-center fw-bold">
                      {royaltyTotal}
                    </div>
                    <div className="col-1 fw-bold">%</div>
                  </div>
                  <div className="row h6 mt-2">Add creator</div>
                  <div className="row">
                    <div className="col-9">
                      <input
                        className={"form-control " + creatorAddressClass}
                        type="text"
                        placeholder="Creator wallet address"
                        value={creatorAddressInput}
                        onChange={handleSetAddressInput}
                      ></input>
                      <div
                        id="validationWalletAddress"
                        className="invalid-feedback"
                      >
                        {creatorInputValid}
                      </div>
                    </div>
                    <div className="col-2">
                      <input
                        className={"form-control text-end " + creatorEarnClass}
                        type="number"
                        step={0.01}
                        min="0"
                        max="10"
                        value={creatorEarnInput}
                        onChange={handleSetCreatorEarnInput}
                      ></input>
                    </div>
                    <div className="col-1">%</div>
                  </div>
                  <div className="row h6 mt-3">
                    <button
                      className="btn btn-secondary"
                      onClick={handleAddCreator}
                    >
                      Add Creator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-auto">
            <button
              className="btn btn-secondary text-white"
              onClick={handleCreateNFT}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <WaitTransactionModal popupState={confirmModal} setPopup={setConfirmModal} ></WaitTransactionModal>
    </div>
  );
};
export default CreateNFT;
