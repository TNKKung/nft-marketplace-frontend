import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "./NFTBox.css";
import useBackend from "../../../hook/useBackend";
import useContracts from "../../../hook/useContracts";
import { weiToEther } from "../../../utils/costHelper";
import { Market_ADDRESS } from "../../../config";

interface CollectionProps {
  TokenID: string;
}
const NFTBox = (props: CollectionProps) => {
  const [URLImage, setURLImage] = useState(
    "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
  );
  const { readTokenIdData } = useBackend();
  const { readTokenURI, readOwnerTokenID, getPrice } = useContracts();
  const [loadingDataClass, setLoadingDataClass] = useState("placeholder");

  const [NFTname, setNFTName] = useState("NFT Name");
  const [saleNFTStatus, setSaleNFTStatus] = useState(false);
  const [nftCost, setNFTCost] = useState(0);
  const fetchData = useCallback(async () => {
    const DataDetail = await readTokenIdData(props.TokenID);
    const realOwnerAddress = await readOwnerTokenID(props.TokenID);
    if (realOwnerAddress === Market_ADDRESS) {
      setSaleNFTStatus(true);
      try {
        const weiCost = await getPrice(props.TokenID);
        setNFTCost(weiToEther(weiCost));
      } catch (Error) {
        console.log(Error);
      }
    } else {
      setSaleNFTStatus(false);
    }
    try {
      const TokenURI = await readTokenURI(props.TokenID);
      setURLImage(TokenURI);
      setNFTName(DataDetail.nameNFT);
      setLoadingDataClass("");
    } catch (error) {
      setNFTName("NFT Name");
    }
  }, [
    getPrice,
    props.TokenID,
    readOwnerTokenID,
    readTokenIdData,
    readTokenURI,
  ]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="m-2 border rounded shadow-sm NFTBox_box d-flex flex-column align-items-center">
        <img
          className={"NFTBox_previewImg"}
          src={URLImage}
          alt="previewImage"
          loading="lazy"
        ></img>
        <div className="p-0 m-0 container-fluid w-100">
          <div className={"row align-items-center p-3"}>
            <div className="col-8">
              <h6
                className={
                  "p-0 m-0 w-100 text-break text-truncate " + loadingDataClass
                }
              >
                {NFTname}
              </h6>
            </div>
            {saleNFTStatus === false ? (
              <div></div>
            ) : (
              <div className="col-4">
                <h6
                  className={
                    "p-0 m-0 w-100 text-break text-truncate text-end " +
                    loadingDataClass
                  }
                >
                  {nftCost}
                </h6>
              </div>
            )}
          </div>
        </div>

        <Link
          className="top-0 position-absolute w-100 h-100"
          to={"/viewNFT/" + props.TokenID}
        ></Link>

        {/* <div className="top-0 position-absolute end-0">
                    <button className="btn" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots"></i></button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <button className="dropdown-item text-end">
                                Remove from collection
                            </button>
                        </li>
                    </ul>
                </div> */}
      </div>
    </div>
  );
};
export default NFTBox;
