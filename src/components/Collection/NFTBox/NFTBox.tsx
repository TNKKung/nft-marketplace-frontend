import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NFTBox.css"
import useBackend from "../../../hook/useBackend"

interface CollectionProps {
    TokenID: string;
}
const NFTBox = (props: CollectionProps) => {
    const { readTokenIdData } = useBackend();
    const [ loadingDataClass, setLoadingDataClass] = useState("placeholder bg-secondary");

    const [ NFTname, setNFTName ] = useState(" ");  
    const fetchData = useCallback(async () => {
        const DataDetail = await readTokenIdData(props.TokenID);
        try {
            setNFTName(DataDetail.nameNFT);
            setLoadingDataClass("");
        } catch (error) {
            setNFTName("NFT Name");
        }
    }, [props.TokenID,
        readTokenIdData,
    ]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <div className="NFTBox_box d-flex flex-column align-items-center border rounded p-4 m-2 shadow-sm">
                <img className={"NFTBox_previewImg"} src="" alt="previewImage"></img>
                <h6 className={"w-100 text-break text-truncate " + loadingDataClass}>{NFTname}</h6>

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