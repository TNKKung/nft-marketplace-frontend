import React from "react";

const BlankNFTCard: React.FC = () => {
  return (
    <div className="m-2 border rounded shadow-sm NFTBox_box d-flex flex-column align-items-center placeholder-glow">
      <img
        className={"NFTBox_previewImg "}
        src={"/images/blank/blankImg.png"}
        alt="previewImage"
        loading="lazy"
      ></img>
      <div className="flex flex-row p-0 px-2 m-0 justify-content-between align-items-center w-100 NFTBox_textBox">
        <div className="placeholder-glow NFTBox_text">
          <h6 className={"p-0 m-0 w-100 text-break text-truncate "}> </h6>
          <p className={"p-0 m-0 w-100 text-break text-truncate "}> </p>
        </div>
      </div>
    </div>
  );
};

export default BlankNFTCard;
