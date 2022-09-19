import React, { useEffect, useState } from 'react'
import "./AddCollection.css"

interface AddCollectionProps {
  setPopup:any;
  popupState:any;
}

const AddCollection = (props : AddCollectionProps) => {
  const [showPopUpClass, setShowPopUpClass] = useState("d-none");
useEffect(()=>{
  if(props.popupState === false){
    setShowPopUpClass("d-none");
    props.setPopup(false);
  }else{
    setShowPopUpClass("");
  }
  // eslint-disable-next-line
},[props.popupState]);

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
            <div className="form-label">Collection Name</div>
            <input className="form-control"></input>
          </div></div>
          <div className="row mt-2"><div className="col">
            <div className="form-label">Description</div>
            <textarea className="form-control"></textarea>
          </div></div>
          <div className="row mt-4"><div className="col-12">
            <button className="btn btn-secondary w-100">Create</button>
          </div></div>
        </div>
      </div>

    </div>
  )
}
export default AddCollection;