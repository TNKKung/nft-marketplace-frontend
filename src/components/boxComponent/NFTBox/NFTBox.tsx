import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "./NFTBox.css";
import useBackend from "../../../hook/useBackend";
import useContracts from "../../../hook/useContracts";
import { weiToEther } from "../../../utils/costHelper";
import useCollection from "../../../hook/useCollection";
import etherPNG from "../../../asset/ethereum-icon.png";
// import { Market_ADDRESS } from "../../../config";

interface CollectionProps {
  TokenID: string;
}
const NFTBox = (props: CollectionProps) => {
  const [URLImage, setURLImage] = useState(
    "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
  );
  const { readTokenIdData } = useBackend();
  const {
    // readTokenURI,
    // readOwnerTokenID,
    getPrice,
  } = useContracts();

  const {
    getCollectionbyId
  } = useCollection();

  const [loadingDataClass, setLoadingDataClass] = useState("placeholder");

  const [NFTname, setNFTName] = useState<string>("NFT Name");
  const [saleNFTStatus, setSaleNFTStatus] = useState<boolean>(false);
  const [nftCost, setNFTCost] = useState(0);
  const [collection, setCollection] = useState<string>("Collection Name")

  const fetchData = useCallback(async () => {
    const DataDetail = await readTokenIdData(props.TokenID);
    if (DataDetail.statusSale === true) {
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
      // const TokenURI = await readTokenURI(props.TokenID);
      setURLImage(DataDetail.tokenURI);
      setNFTName(DataDetail.nameNFT);
      setLoadingDataClass("");
      if (DataDetail.collectionId !== "" && DataDetail.collectionId !== "none") {
        try {
          const collectionRes = await getCollectionbyId(DataDetail.collectionId);
          setCollection(collectionRes.collectionName);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      setNFTName("NFT Name");
    }
  }, [
    getPrice,
    props.TokenID,
    // readOwnerTokenID,
    readTokenIdData,
    // readTokenURI,
    getCollectionbyId
  ]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="m-2 border rounded shadow-sm NFTBox_box d-flex flex-column align-items-center placeholder-glow">
        <img
          className={"NFTBox_previewImg " + loadingDataClass}
          src={URLImage}
          alt="previewImage"
          loading="lazy"
        ></img>
        <div className="p-0 px-2 m-0 flex flex-row justify-content-between align-items-center w-100 NFTBox_textBox">
          <div className="placeholder-glow NFTBox_text">
            {collection === "Collection Name" ?
              null : 
              <h6 className={"p-0 m-0 w-100 text-break text-truncate " + loadingDataClass}>
                {collection}
              </h6>
            }
            <p className={"p-0 m-0 w-100 text-break text-truncate " + loadingDataClass}>
              {NFTname}
            </p>
          </div>
          {saleNFTStatus === false ? (
            null
          ) : (
            <div className="placeholder-glow">
              <div className="flex flex-row align-items-center">
                <img className="NFTBox_etherIcon" src={etherPNG} alt="etherIcon" />
                <h6 className={"p-0 m-0 w-100 text-break text-truncate text-end justify-content-center" +
                  loadingDataClass
                }>
                  {nftCost}
                </h6>
              </div>
            </div>
          )}

        </div>

        <Link
          className="top-0 position-absolute w-100 h-100"
          to={"/viewNFT/" + props.TokenID}
        ></Link>
      </div>
    </div>
  );
};
export default NFTBox;
