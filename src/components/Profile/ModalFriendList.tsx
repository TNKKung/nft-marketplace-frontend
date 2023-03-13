import React from "react";
import ReactModal from "react-modal";

import { FriendListImportModalProps } from "./type";
import { shortenAddress } from "../../utils/addressHelper";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalFriendList: React.FC<FriendListImportModalProps> = ({
  isOpen,
  handleClose,
  friendList,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Favorite list people"
    >
      <div className="flex flex-col space-y-4 h-80 w-96">
        <div className="flex flex-row justify-between w-full h-8">
          <p>Favorite list people</p>
          <button
            type="button"
            className="p-1 border rounded-md border-danger text-danger"
            onClick={handleClose}
          >
            close
          </button>
        </div>
        <div className="flex flex-col h-full p-2 space-y-2 border rounded-md border-success">
          {friendList &&
            friendList.map((friend: string, index: number) => {
              return (
                <Link
                  className="flex flex-row w-full text-dark text-decoration-none"
                  to={`/profile/${friend}`}
                  onClick={handleClose}
                >
                  <p>{index + 1}. </p> <p> {shortenAddress(friend)}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </ReactModal>
  );
};
export default ModalFriendList;
