import { useCallback, useEffect, useState } from "react";

import { DeleteCollectionProps } from "../type";

import useCollection from "../../../hook/useCollection";
import "../../../css/ModalCustom.css";

const DeleteCollection: React.FC<DeleteCollectionProps> = ({
  collectionObject,
  popupState,
  setCollectionList,
  setPopup,
}) => {
  const { deleteCollection } = useCollection();

  const [loadingPopUpClass, setLoadingPopUpClass] = useState("d-none");

  const handleDeleteButton = useCallback(async () => {
    setLoadingPopUpClass("");
    const DeleteCollectionRes = await deleteCollection(
      collectionObject.collectionId
    );
    if (DeleteCollectionRes === "Success") {
      setCollectionList();
      setPopup();
      setLoadingPopUpClass("d-none");
    } else {
      setLoadingPopUpClass("d-none");
    }
  }, [
    collectionObject.collectionId,
    deleteCollection,
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
              <h5>Delete Collection</h5>
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
              Are you sure to delete{" "}
              <span className="text-danger">
                {collectionObject.collectionName}
              </span>{" "}
              ?
            </div>
          </div>
          <div className="mt-4 row">
            <div className="col-6">
              <button
                className="btn btn-secondary w-100"
                onClick={handleDeleteButton}
              >
                Delete
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-secondary w-100" onClick={closeModal}>
                Cancel
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
export default DeleteCollection;
