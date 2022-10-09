import { useCallback, useEffect, useState } from 'react'
import useCollection from '../../../hook/useCollection';
import "../ModalCustom.css"

interface DeleteCollectionProps {
    setPopup: any;
    popupState: any;
    setCollectionList: any;
    collectionObject: any;
}

const DeleteCollection = (props: DeleteCollectionProps) => {
    const { deleteCollection } = useCollection();


    const [loadingPopUpClass, setLoadingPopUpClass] = useState("d-none");

    const handleDeleteButton = useCallback(async () => {

        setLoadingPopUpClass("");
        const DeleteCollectionRes = await deleteCollection(props.collectionObject.collectionId);
        if (DeleteCollectionRes === "Success") {
            props.setCollectionList();
            props.setPopup(false);
            setLoadingPopUpClass("d-none");
        } else {
            setLoadingPopUpClass("d-none");
        }

    }, [deleteCollection,
        props
    ])

    const [showPopUpClass, setShowPopUpClass] = useState("d-none");
    useEffect(() => {
        if (props.popupState === false) {
            setShowPopUpClass("d-none");
            props.setPopup(false);
        } else {
            setShowPopUpClass("");
        }
        // eslint-disable-next-line
    }, [props.popupState]);

    const closeModal = () => {
        props.setPopup(false);
    }

    return (
        <div className={"position-fixed top-0 w-100 h-100 Modal_Popup " + showPopUpClass}>

            <div className="position-absolute top-0 w-100 h-100" onClick={closeModal}></div>

            <div className={"position-relative top-50 start-50 w-25 bg-white rounded Modal_form"}>
                <div className="container-fluid p-3">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto"><h5>Delete Collection</h5></div>
                        <div className="col-auto"><h4><i className="bi bi-x-lg Modal_cursor_pointer" onClick={closeModal}></i></h4></div>
                    </div>
                    <div className="row mt-3"><div className="col">
                        Are you sure to delete <span className="text-danger">{props.collectionObject.collectionName}</span> ?
                    </div></div>
                    <div className="row mt-4">
                        <div className="col-6">
                            <button className="btn btn-secondary w-100" onClick={handleDeleteButton}>Delete</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-secondary w-100" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"position-fixed top-0 w-100 h-100 Modal_loadingClass d-flex justify-content-center align-items-center " + loadingPopUpClass}>
                <div className="spinner-border viewNFT_loading" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}
export default DeleteCollection;