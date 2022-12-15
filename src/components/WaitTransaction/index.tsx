import { useEffect, useState } from "react";
import "../../css/ModalCustom.css"
import "./waitTransaction.css"
import { useTransactionAction } from "../../store/TransactionAction/hook"

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

    useEffect(() => {
        if (waitTransaction === true) {
            setSignApprove(true);
        } else if (waitTransaction === false && signApprove === true) {
            setTransactionConfirm(true);
            const timer = setTimeout(() => closeModal(), 3000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line
    }, [waitTransaction]);

    const closeModal = () => {
        console.log("work");
        setSignApprove(false);
        setTransactionConfirm(false);
        props.setPopup(false);
    }
    return (
        <div className={"position-fixed top-0 w-100 h-100 Modal_Popup " + showPopUpClass} onClick={() => { }}>

            <div className="position-absolute top-0 w-100 h-100"></div>

            <div className={"position-relative top-50 start-50 w-25 bg-white rounded Modal_form"}>
                <div className="container-fluid p-3">
                    {signApprove === true ?
                        <div>
                            <div className="row justify-content-center align-items-center">
                                <div className="col-auto text-green-500"><h5>Confirm wallet completed</h5></div>
                            </div>
                            {transactionConfirm === true ?
                                <div>
                                    <div className="row mt-3 justify-content-center">
                                        <div className="col-auto">
                                            <i className="bi bi-check-lg h2 m-0 text-green-500"></i>
                                        </div>
                                    </div>
                                    <div className="row mt-3 justify-content-center">
                                        <div className="col-auto text-green-500"><h6>Progress completed</h6></div>
                                    </div>
                                </div> :
                                <div>
                                    <div className="row mt-3 justify-content-center">
                                        <div className="col-auto">
                                            <div className="waitTransaction_loading"></div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 justify-content-center">
                                        <div className="col-auto"><h6>In confirmation transaction progress...</h6></div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-auto">please wait until the status change</div>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div>
                            <div className="row justify-content-center align-items-center">
                                <div className="col-auto"><h5>waiting for confirmation</h5></div>
                            </div>
                            <div className="row mt-3 justify-content-center">
                                <div className="col-auto"><div className="waitTransaction_loading"></div></div>
                            </div>
                            <div className="row mt-3 justify-content-center">
                                <div className="col-auto">confirm this transaction in your wallet</div>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}
export default WaitTransactionModal;