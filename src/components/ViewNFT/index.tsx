import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom";
import useContracts from "../../hook/useContracts";
import useBackend from "../../hook/useBackend";
import { CONTRACT_ADDRESS, blockchainName } from "../../config"
import "./viewNFT.css"
import { shortenAddress } from "../../utils/addressHelper";

const ViewNFT: React.FC = () => {
    const params = useParams();
    const [URLImage, setURLImage] = useState();
    const [nftName, setNFTName] = useState<string>("");
    const [nftDescription, setNFTDescription] = useState<string>("");
    const [ownerNFTAddress, setOwnerNFTAddress] = useState<string>("");
    const { readTokenURI, readOwnerTokenID } = useContracts();
    const { readTokenIdData } = useBackend();

    const [loadingClass, setLoadingClass] = useState("");
    const [mainClass1, setMainClass1] = useState("d-none");

    const fetchData = useCallback(async () => {
        const TokenURI = await readTokenURI(params.tokenID);
        setURLImage(TokenURI);
        const ownerAddress = await readOwnerTokenID(params.tokenID);
        setOwnerNFTAddress(ownerAddress);
        const DataDetail = await readTokenIdData(params.tokenID);

        try {
            setNFTName(DataDetail.nameNFT);
            setNFTDescription(DataDetail.description);
        } catch(error) {
            setNFTName("Name NFT");
            setNFTDescription("");
        }
        setLoadingClass("d-none");
        setMainClass1("d-flex");
    }, [params.tokenID,
        readTokenURI,
        readOwnerTokenID,
        readTokenIdData,
    ]);

    const [descriptionClass, setDescriptionClass] = useState(["show", "-up"]);
    const [detailsClass, setDetailsClass] = useState(["", "-down"]);

    const handleDesciption = useCallback(() => {
        if (descriptionClass[0] === "") {
            setDescriptionClass(["show", "-up"]);
        } else {
            setDescriptionClass(["", "-down"]);
        }
    }, [descriptionClass])

    const handleDetails = useCallback(() => {
        if (detailsClass[0] === "") {
            setDetailsClass(["show", "-up"]);
        } else {
            setDetailsClass(["", "-down"]);
        }

    }, [detailsClass]);

    const [mainClass2, setMainClass2] = useState(["", "w-50", false]);
    const [imageClass, setImageClass] = useState(["justify-content-end", "col-7"]);
    const [rightDetailClass, setRightDetailClass] = useState(["", "col-8"])

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
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    });

    return (
        <div>
            <div className={"container-fluid mt-5 d-flex justify-content-center " + loadingClass}>
                <div className="spinner-border viewNFT_loading" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className={"container-fluid mt-5 " + mainClass1 + " " + mainClass2[0]}>
                <div className={"container-fluid " + mainClass2[1]}>
                    <div className={mainClass2[2] === false ? "d-none" : ""}>
                        <div className="row h4">{nftName}</div>
                        <div className="row mb-3">
                            <div className="col-auto">Owner by</div>
                            <div className="col">{ownerNFTAddress === "" ? "" : shortenAddress(ownerNFTAddress)}</div>
                        </div>
                    </div>
                    <div className={"row " + imageClass[0]}><div className={imageClass[1]}><img className={"img-thumbnail viewNFT_cursor_pointer"}
                        src={URLImage}
                        alt="ImageNFT"
                    ></img></div>
                    </div>
                    <div className={"row my-3 " + imageClass[0]}>
                        <div className={imageClass[1]}>
                            <div className="container-fluid border rounded">

                                <div className="row justify-content-between viewNFT_cursor_pointer border-bottom" onClick={handleDesciption}>
                                    <div className="col-auto h5 my-2 text-start"><i className="bi bi-body-text"></i> Description</div>
                                    <div className="col-auto h5 my-2 text-start"><i className={"bi bi-chevron" + descriptionClass[1]}></i></div>
                                </div>

                                <div className={"row collapse" + descriptionClass[0]}><div className="col-12 px-0">
                                    <div className="container-fluid bg-gray-100 py-2 border-bottom">
                                        <div className="row py-1">
                                            <div className="col-auto">{nftDescription}</div>
                                        </div>
                                    </div>
                                </div></div>

                                <div className="row justify-content-between viewNFT_cursor_pointer" onClick={handleDetails}>
                                    <div className="col-auto h5 my-2 text-start"><i className="bi bi-card-text"></i> Details</div>
                                    <div className="col-auto h5 my-2 text-start"><i className={"bi bi-chevron" + detailsClass[1]}></i></div>
                                </div>

                                <div className={"row collapse" + detailsClass[0]}><div className="col-12 px-0">
                                    <div className="container-fluid bg-gray-100 py-2 border-bottom">
                                        <div className="row py-1 justify-content-between">
                                            <div className="col h6">Contract Address</div>
                                            <div className="col-auto">{shortenAddress(CONTRACT_ADDRESS)}</div>
                                        </div>
                                        <div className="row py-1 justify-content-between">
                                            <div className="col h6">TokenID</div>
                                            <div className="col-auto">{params.tokenID}</div>
                                        </div>
                                        <div className="row py-1 justify-content-between">
                                            <div className="col h6">Token standard</div>
                                            <div className="col-auto">ERC-721</div>
                                        </div>
                                        <div className="row py-1 justify-content-between">
                                            <div className="col h6">Blockchain</div>
                                            <div className="col-auto">{blockchainName}</div>
                                        </div>
                                    </div>
                                </div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"container-fluid " + mainClass2[1]}>
                    <div className={"row " + rightDetailClass[0]}>
                        <div className={rightDetailClass[1]}>
                            <div className="container-fluid">
                                <div className={mainClass2[2] === false ? "" : "d-none"}>
                                    <div className="row h4">{nftName}</div>
                                    <div className="row">
                                        <div className="col-auto">Owner by</div>
                                        <div className="col">{ownerNFTAddress === "" ? "" : shortenAddress(ownerNFTAddress)}</div>
                                    </div>
                                </div>
                                <div className="row mt-3"><div className="col-12 px-0">
                                    <div className="contrainer py-2 border rounded">
                                        <div className="row justify-content-end px-3">
                                            <div className="col-auto">
                                                <button className="btn btn-secondary">Sell</button>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>
                                <div className="row my-3"><div className="col-auto h5">Transaction</div></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ViewNFT;