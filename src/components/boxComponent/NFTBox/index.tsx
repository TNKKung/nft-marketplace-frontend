import React from "react";
import { Link } from "react-router-dom";

import "./NFTBox.css";

import etherPNG from "../../../asset/ethereum-icon.png";

interface NFTProps {
  tokenId: number;
  URLImage: string;
  collection: string;
  NFTname: string;
  saleNFTStatus: boolean;
  price: string;
}
const NFTBox: React.FC<NFTProps> = ({
  tokenId,
  NFTname,
  URLImage,
  collection,
  price,
  saleNFTStatus,
}) => {
  return (
    <div className="m-2 border rounded shadow-sm NFTBox_box d-flex flex-column align-items-center placeholder-glow">
      <img
        className={"NFTBox_previewImg "}
        src={URLImage}
        alt="previewImage"
        loading="lazy"
      ></img>
      <div className="flex flex-row p-0 px-2 m-0 justify-content-between align-items-center w-100 NFTBox_textBox">
        <div className="placeholder-glow NFTBox_text">
          {collection === "Collection Name" ? null : (
            <h6 className={"p-0 m-0 w-100 text-break text-truncate "}>
              {collection}
            </h6>
          )}
          <p className={"p-0 m-0 w-100 text-break text-truncate "}>{NFTname}</p>
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
                  "p-0 m-0 w-100 text-break text-truncate text-end justify-content-center"
                }
              >
                {price}
              </h6>
            </div>
          </div>
        )}
      </div>

      <Link
        className="top-0 position-absolute w-100 h-100"
        to={"/viewNFT/" + tokenId}
      ></Link>
    </div>
  );
};
export default NFTBox;
