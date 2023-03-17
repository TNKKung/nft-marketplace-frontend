import React from "react";

const BlankCollectionCard: React.FC = () => {
  return (
    <div className="border rounded shadow-sm animate-pulse UserBox_box d-flex flex-column align-items-center">
      <div className="border rounded shadow-sm container-fluid">
        <div className="row">
          <div className="p-0 col-12 placeholder-glow">
            <img
              src={"/images/blank/blankImg.png"}
              alt="bgProfileImage"
              className={`collectionBox_bgImg`}
            />
          </div>
        </div>

        <div className="px-2 my-1 mt-2 row justify-content-end placeholder-glow">
          <h6 className={"col-6 p-0 m-0 text-break text-truncate text-end"}>
            {" "}
          </h6>
        </div>
        <div className="px-2 mb-2 row justify-content-end placeholder-glow align-items-center">
          <div className={"col-6 p-0 me-2 text-break text-truncate text-end"}>
            {" "}
          </div>
          <div className="col-auto p-0">
            <img
              src={"/images/blank/blankImg.png"}
              alt="profileImage"
              className={`collectionBox_profile p-0`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlankCollectionCard;
