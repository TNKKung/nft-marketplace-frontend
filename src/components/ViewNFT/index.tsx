import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom";
import useContracts from "../../hook/useContracts";
import "./viewNFT.css"
const ViewNFT: React.FC = () => {
    const params = useParams();
    const [URLImage, setURLImage] = useState();
    const { readTokenURI } = useContracts();

    const [loadingClass, sestLoadingClass] = useState("");
    const [mainClass, sestMainClass] = useState("d-none");

    const fetchData = useCallback(async () => {
        const TokenURI = await readTokenURI(params.tokenID);
        setURLImage(TokenURI);
        sestLoadingClass("d-none");
        sestMainClass("flex-column");
    }, [params.tokenID,
        readTokenURI])

    useEffect(() => {
        fetchData();
    }, [fetchData])


    return (
        <div>
            <div className={"container-fluid mt-5 d-flex justify-content-center " + loadingClass}>
                <div className="spinner-border viewNFT_loading" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className={"container-fluid mt-5 d-flex" + mainClass}>
                <div className="container-fluid">
                    <img className={"img-thumbnail"} src={URLImage} alt="ImageNFT"></img>
                </div>
                <div className="container-fluid">

                </div>

            </div>
        </div>
    )
}
export default ViewNFT;