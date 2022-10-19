import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "./NFTBox.css"
import useBackend from "../../../hook/useBackend"
import useContracts from "../../../hook/useContracts";

interface CollectionProps {
    TokenID: string;
}
const NFTBox = (props: CollectionProps) => {
    const [URLImage, setURLImage] = useState("data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
    const { readTokenIdData } = useBackend();
    const { readTokenURI } = useContracts();
    const [ loadingDataClass, setLoadingDataClass] = useState("placeholder bg-secondary");

    const [ NFTname, setNFTName ] = useState("");  
    const fetchData = useCallback(async () => {
        const DataDetail = await readTokenIdData(props.TokenID);
        try {
            const TokenURI = await readTokenURI(props.TokenID);
            setURLImage(TokenURI);
            setNFTName(DataDetail.nameNFT);
            setLoadingDataClass("");
        } catch (error) {
            setNFTName("NFT Name");
        }
    }, [props.TokenID,
        readTokenIdData,
        readTokenURI
    ]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <div className="NFTBox_box d-flex flex-column align-items-center border rounded m-2 shadow-sm">
                <img className={"NFTBox_previewImg"} src={URLImage} alt="previewImage" loading="lazy"></img>
                <h6 className={"p-3 m-0 w-100 text-break text-truncate " + loadingDataClass}>{NFTname}</h6>

                <Link className="position-absolute top-0 w-100 h-100" to={"/viewNFT/" + props.TokenID}></Link>

                <div className="position-absolute top-0 end-0">
                    <button className="btn" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots"></i></button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        {/* <li><hr className="dropdown-divider" /></li> */}
                        <li>
                            <button className="dropdown-item text-end">
                                Remove from collection
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default NFTBox;