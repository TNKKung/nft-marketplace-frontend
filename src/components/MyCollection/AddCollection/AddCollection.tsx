import React, { useCallback, useEffect, useState } from "react";
import { AddCollectionProps } from "../type";

import "../../../css/ModalCustom.css";
import useCollection from "../../../hook/useCollection";
import { useUserAccount } from "../../../store/UserAction/hook";

const AddCollection: React.FC<AddCollectionProps> = ({
  popupState,
  setCollectionList,
  setPopup,
}) => {
  const { address } = useUserAccount();
  const { createCollection } = useCollection();

  const [collectionName, setCollectionName] = useState("");
  const handleCollectionName = useCallback((e: any) => {
    if (e.target.value.length < 30) {
      setCollectionName(e.target.value);
    }
  }, []);

  const [collectionDescription, setCollectionDescription] = useState("");
  const handleCollectionDescription = useCallback((e: any) => {
    if (e.target.value.length < 100) {
      setCollectionDescription(e.target.value);
    }
  }, []);

  const [invalidProblemClass, setInvalidProblemClass] = useState("d-none");
  const [loadingPopUpClass, setLoadingPopUpClass] = useState("d-none");
  const [collectionNameClass, setCollectionNameClass] = useState("");
  const handleCreateButton = useCallback(async () => {
    var approveCollectionName = true;
    setCollectionNameClass("");
    if (collectionName.length === 0) {
      approveCollectionName = false;
    }
    if (approveCollectionName === true) {
      setLoadingPopUpClass("");
      const createCollectionRes = await createCollection(
        address,
        collectionName,
        collectionDescription
      );
      console.log(createCollectionRes);
      if (createCollectionRes === "Success") {
        setCollectionList();
        setPopup();
        setLoadingPopUpClass("d-none");
      } else {
        setInvalidProblemClass("");
        setLoadingPopUpClass("d-none");
      }
    } else {
      setCollectionNameClass("is-invalid");
    }
  }, [
    collectionName,
    createCollection,
    address,
    collectionDescription,
    setCollectionList,
    setPopup,
  ]);

  const [showPopUpClass, setShowPopUpClass] = useState("d-none");
  useEffect(() => {
    if (popupState === false) {
      setShowPopUpClass("d-none");
      setPopup();
    } else {
      setShowPopUpClass("");
      setCollectionName("");
      setCollectionDescription("");
      setCollectionNameClass("");
      setInvalidProblemClass("d-none");
    }
    // eslint-disable-next-line
  }, [popupState]);

  const closeModal = () => {
    setPopup();
  };

  return (
    <div
      className={
        "position-fixed top-0 w-100 h-100 Modal_Popup " + showPopUpClass
      }
    >
      <div
        className="top-0 position-absolute w-100 h-100"
        onClick={closeModal}
      ></div>

      <div
        className={
          "position-relative top-50 start-50 w-25 bg-white rounded Modal_form"
        }
      >
        <div className="p-3 container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <h5>Create Collection</h5>
            </div>
            <div className="col-auto">
              <h4>
                <i
                  className="bi bi-x-lg Modal_cursor_pointer"
                  onClick={closeModal}
                ></i>
              </h4>
            </div>
          </div>
          <div className="mt-3 row">
            <div className="col">
              <div className="form-label">
                Collection Name <span className="text-danger">*</span>
              </div>
              <input
                className={"form-control " + collectionNameClass}
                value={collectionName}
                placeholder="Collection Name"
                onChange={handleCollectionName}
              ></input>
              <div className="invalid-feedback">
                {"Please provide Collection Name"}
              </div>
            </div>
          </div>
          <div className="mt-2 row">
            <div className="col">
              <div className="form-label">Description</div>
              <textarea
                className="form-control"
                value={collectionDescription}
                onChange={handleCollectionDescription}
              ></textarea>
            </div>
          </div>
          <div className={"row mt-2 " + invalidProblemClass}>
            <div className="col">
              <div className="text-danger">
                Create unsuccessful, please try again
              </div>
            </div>
          </div>
          <div className="mt-4 row">
            <div className="col-12">
              <button
                className="btn btn-secondary w-100"
                onClick={handleCreateButton}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "position-fixed top-0 w-100 h-100 Modal_loadingClass d-flex justify-content-center align-items-center " +
          loadingPopUpClass
        }
      >
        <div className="spinner-border viewNFT_loading" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};
export default AddCollection;
