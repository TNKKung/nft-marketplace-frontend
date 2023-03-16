import { useCallback, useEffect, useState } from "react";

import { EditCollectionProps } from "../type";

import useCollection from "../../../hook/useCollection";
import "../../../css/ModalCustom.css";

const EditCollection: React.FC<EditCollectionProps> = ({
  popupState,
  setCollection,
  setPopup,
  collectionId,
}) => {
  const { editCollection, getCollectionbyId } = useCollection();

  const [collectionDescription, setCollectionDescription] =
    useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");
  const [invalidProblemClass, setInvalidProblemClass] =
    useState<string>("d-none");
  const [loadingPopUpClass, setLoadingPopUpClass] = useState<string>("d-none");
  const [collectionNameClass, setCollectionNameClass] = useState<string>("");

  const handleCollectionName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 30) {
        setCollectionName(e.target.value);
      }
    },
    []
  );

  const handleCollectionDescription = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length < 100) {
        setCollectionDescription(e.target.value);
      }
    },
    []
  );

  const handleEditBtn = useCallback(async () => {
    let approveCollectionName = true;
    setCollectionNameClass("");
    if (collectionName.length === 0) {
      approveCollectionName = false;
    }
    if (approveCollectionName === true) {
      setLoadingPopUpClass("");
      const EditCollectionRes = await editCollection(
        collectionId,
        collectionName,
        collectionDescription
      );
      console.log(EditCollectionRes);
      if (EditCollectionRes === "Success") {
        setCollection(collectionName, collectionDescription);
        setPopup(false);
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
    editCollection,
    collectionId,
    collectionDescription,
    setCollection,
    setPopup,
  ]);

  const fetchData = useCallback(async () => {
    const collectionRes = await getCollectionbyId(collectionId);
    console.log(collectionRes);
    setCollectionName(collectionRes.collectionName);
    setCollectionDescription(collectionRes.description);
  }, [collectionId, getCollectionbyId]);

  const [showPopUpClass, setShowPopUpClass] = useState("d-none");
  useEffect(() => {
    if (popupState === false) {
      setShowPopUpClass("d-none");
      setPopup(false);
    } else {
      setShowPopUpClass("");
      fetchData();
      setCollectionNameClass("");
      setInvalidProblemClass("d-none");
    }
    // eslint-disable-next-line
  }, [popupState]);

  const closeModal = () => {
    setPopup(false);
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
              <h5>Edit Collection</h5>
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
                Edit unsuccessful, please try again
              </div>
            </div>
          </div>
          <div className="mt-4 row">
            <div className="col-12">
              <button
                className="btn btn-secondary w-100"
                onClick={handleEditBtn}
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
export default EditCollection;
