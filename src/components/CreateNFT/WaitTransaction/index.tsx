import { useEffect, useState } from "react";
import "../../../css/ModalCustom.css"
import "./waitTransaction.css"
import { useTransactionAction } from "../../../store/TransactionAction/hook"

interface waitTransactionModalProps {
    setPopup: any;
    popupState: boolean;
}
const WaitTransactionModal = (props: waitTransactionModalProps) => {
    const { waitTransaction } = useTransactionAction();
    const [signApprove, setSignApprove] = useState<boolean>(false);
    const [transactionConfirm, setTransactionConfirm] = useState<boolean>(false)

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

    useEffect(()=>{
        if(waitTransaction === true){
            setSignApprove(true);
        }else if(waitTransaction === false && signApprove === true){
            setTransactionConfirm(true);
            closeModal();
        }
        // eslint-disable-next-line
    },[waitTransaction])

    const closeModal = () => {
        props.setPopup(false);
    }
    return (
        <div className={"position-fixed top-0 w-100 h-100 Modal_Popup " + showPopUpClass} onClick={()=>{}}>

            <div className="position-absolute top-0 w-100 h-100"></div>

            <div className={"position-relative top-50 start-50 w-25 bg-white rounded Modal_form"}>
                <div className="container-fluid p-3">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-auto"><h5>Create NFT Confirmation</h5></div>
                    </div>
                    <div className="row mt-3 justify-content-between align-items-center">
                        <div className="col-auto h6 m-0">Sign approve</div>
                        {signApprove === true?  <div className="col-auto"><i className="bi bi-check-lg h4 m-0"></i></div> : 
                        <div className="col-auto"><div className="waitTransaction_loading"></div></div> }
                    </div>
                    <div className="row my-2 justify-content-start">
                        <div className="col-auto"><i className="bi bi-three-dots-vertical"></i></div>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto h6 m-0">Transaction confirmation </div>
                        {transactionConfirm === true?  <div className="col-auto"><i className="bi bi-check-lg h4 m-0"></i></div> : 
                        <div className="col-auto"><div className="waitTransaction_loading"></div></div> }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WaitTransactionModal;