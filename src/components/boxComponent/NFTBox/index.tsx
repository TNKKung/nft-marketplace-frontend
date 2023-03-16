import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./NFTBox.css";

import useBackend from "../../../hook/useBackend";
import useCollection from "../../../hook/useCollection";
import etherPNG from "../../../asset/ethereum-icon.png";

interface NFTProps {
  TokenID: string;
}
const NFTBox: React.FC<NFTProps> = ({ TokenID }) => {
  const { readTokenIdData } = useBackend();
  const { getCollectionbyId } = useCollection();

  const [URLImage, setURLImage] = useState<string>(
    "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
  );
  const [loadingDataClass, setLoadingDataClass] =
    useState<string>("placeholder");
  const [NFTname, setNFTName] = useState<string>("NFT Name");
  const [saleNFTStatus, setSaleNFTStatus] = useState<boolean>(false);
  const [nftCost, setNFTCost] = useState<number>(0);
  const [collection, setCollection] = useState<string>("Collection Name");

  const fetchData = useCallback(async () => {
    const DataDetail = await readTokenIdData(TokenID);
    if (DataDetail.statusSale === true) {
      setSaleNFTStatus(true);
      try {
        setNFTCost(DataDetail.price);
      } catch (Error) {
        console.log(Error);
      }
    } else {
      setSaleNFTStatus(false);
    }
    try {
      // const TokenURI = await readTokenURI(TokenID);
      setURLImage(DataDetail.tokenURI);
      setNFTName(DataDetail.nameNFT);
      setLoadingDataClass("");
      if (
        DataDetail.collectionId !== "" &&
        DataDetail.collectionId !== "none"
      ) {
        try {
          const collectionRes = await getCollectionbyId(
            DataDetail.collectionId
          );
          setCollection(collectionRes.collectionName);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      setNFTName("NFT Name");
    }
  }, [
    TokenID,
    // readOwnerTokenID,
    readTokenIdData,
    // readTokenURI,
    getCollectionbyId,
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
        <div className="flex flex-row p-0 px-2 m-0 justify-content-between align-items-center w-100 NFTBox_textBox">
          <div className="placeholder-glow NFTBox_text">
            {collection === "Collection Name" ? null : (
              <h6
                className={
                  "p-0 m-0 w-100 text-break text-truncate " + loadingDataClass
                }
              >
                {collection}
              </h6>
            )}
            <p
              className={
                "p-0 m-0 w-100 text-break text-truncate " + loadingDataClass
              }
            >
              {NFTname}
            </p>
          </div>
          {saleNFTStatus === false ? null : (
            <div className="placeholder-glow">
              <div className="flex flex-row align-items-center">
                <img
                  className="NFTBox_etherIcon"
                  src={etherPNG}
                  alt="etherIcon"
                />
                <h6
                  className={
                    "p-0 m-0 w-100 text-break text-truncate text-end justify-content-center" +
                    loadingDataClass
                  }
                >
                  {nftCost}
                </h6>
              </div>
            </div>
          )}
        </div>

        <Link
          className="top-0 position-absolute w-100 h-100"
          to={"/viewNFT/" + TokenID}
        ></Link>
      </div>
    </div>
  );
};
export default NFTBox;
