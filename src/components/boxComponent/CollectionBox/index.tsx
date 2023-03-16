import React from "react";
import { Link } from "react-router-dom";

import "./CollectionBox.css";
import { CollectionProps } from "./type";

const CollectionBox: React.FC<CollectionProps> = ({
  collectionId,
  collectionName,
  description,
  nftImage,
  ownerName,
  profileImage,
}) => {
  return (
    <div>
      <div className="border rounded shadow-sm UserBox_box d-flex flex-column align-items-center">
        <div className="border rounded shadow-sm container-fluid">
          <div className="row">
            <div className="p-0 col-12 placeholder-glow">
              <img
                src={nftImage ? nftImage : "/images/blank/blankBgImg.png"}
                alt="bgProfileImage"
                className={`collectionBox_bgImg bg-gray-300 ${
                  nftImage ? "" : "placeholder"
                }`}
              ></img>
            </div>
          </div>

          <div className="px-2 my-1 mt-2 row justify-content-end placeholder-glow">
            <h6 className={"col-6 p-0 m-0 text-break text-truncate text-end"}>
              {collectionName}
            </h6>
          </div>
          <div className="px-2 mb-2 row justify-content-end placeholder-glow align-items-center">
            <div className={"col-6 p-0 me-2 text-break text-truncate text-end"}>
              {ownerName}
            </div>
            <div className="col-auto p-0">
              <img
                src={profileImage ? profileImage : "/images/blank/blankImg.png"}
                alt="profileImage"
                className={`collectionBox_profile p-0 bg-gray-800 ${
                  profileImage ? "" : "placeholder"
                }`}
              ></img>
            </div>
          </div>
        </div>
        <Link
          className="top-0 position-absolute w-100 h-100"
          to={"/collection/" + collectionId}
        ></Link>
      </div>
    </div>
  );
};
export default CollectionBox;
