import React, { useCallback, useEffect, useState } from 'react'
import useCollection from '../../../hook/useCollection';
import { useUserAccount } from '../../../store/UserAction/hook';
import "./AddCollection.css"

interface AddCollectionProps {
  setPopup: any;
  popupState: any;
  setCollectionList: any;
}

const AddCollection = (props: AddCollectionProps) => {
  const { address } = useUserAccount();
  const { createCollection } = useCollection();



  const [collectionName, setCollectionName] = useState("");
  const handleCollectionName = useCallback((e: any) => {
    if (e.target.value.length < 30) {
      setCollectionName(e.target.value);
    }
  }, [])

  const [collectionDescription, setCollectionDescription] = useState("");
  const handleCollectionDescription = useCallback((e: any) => {
    if (e.target.value.length < 100) {
      setCollectionDescription(e.target.value);
    }
  }, [])

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
      const createCollectionRes = await createCollection(address, collectionName, collectionDescription);
      console.log(createCollectionRes);
      if (createCollectionRes === "Success") {
        props.setCollectionList();
        props.setPopup(false);
        setLoadingPopUpClass("d-none");
      } else {
        setInvalidProblemClass("");
        setLoadingPopUpClass("d-none");
      }
    }else{
      setCollectionNameClass("is-invalid");
    }
  }, [collectionName,
    collectionDescription,
    address,
    createCollection,
    props
  ])

  const [showPopUpClass, setShowPopUpClass] = useState("d-none");
  useEffect(() => {
    if (props.popupState === false) {
      setShowPopUpClass("d-none");
      props.setPopup(false);
    } else {
      setShowPopUpClass("");
      setCollectionName("")
      setCollectionDescription("");
      setCollectionNameClass("");
      setInvalidProblemClass("d-none")
    }
    // eslint-disable-next-line
  }, [props.popupState]);

  const closeModal = () => {
    props.setPopup(false);
  }

  return (
    <div className={"position-fixed top-0 w-100 h-100 AddCollection_Popup " + showPopUpClass}>

      <div className="position-absolute top-0 w-100 h-100" onClick={closeModal}></div>

      <div className={"position-relative top-50 start-50 w-25 bg-white rounded AddCollection_form"}>
        <div className="container-fluid p-3">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto"><h5>Create Collection</h5></div>
            <div className="col-auto"><h4><i className="bi bi-x-lg AddCollection_cursor_pointer" onClick={closeModal}></i></h4></div>
          </div>
          <div className="row mt-3"><div className="col">
            <div className="form-label">Collection Name <span className="text-danger">*</span></div>
            <input className={"form-control "+ collectionNameClass} value={collectionName} placeholder="Collection Name"
              onChange={handleCollectionName}></input>
            <div className="invalid-feedback">{"Please provide Collection Name"}</div>
          </div></div>
          <div className="row mt-2"><div className="col">
            <div className="form-label">Description</div>
            <textarea className="form-control" value={collectionDescription} onChange={handleCollectionDescription}></textarea>
          </div></div>
          <div className={"row mt-2 " + invalidProblemClass}><div className="col">
            <div className="text-danger">Create unsuccessful, please try again</div>
          </div></div>
          <div className="row mt-4"><div className="col-12">
            <button className="btn btn-secondary w-100" onClick={handleCreateButton}>Create</button>
          </div></div>
        </div>
      </div>
      
      <div className={"position-fixed top-0 w-100 h-100 AddCollection_loadingClass d-flex justify-content-center align-items-center " + loadingPopUpClass}>
        <div className="spinner-border viewNFT_loading" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}
export default AddCollection;