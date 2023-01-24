import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBackend from "../../hook/useBackend";

import { useUserAccount } from "../../store/UserAction/hook";
import { shortenAddress } from "../../utils/addressHelper";
import blankImage from "./blankImg.png";
import "./header.css"

const Header: React.FC = () => {
  const { address, loginMetamask, changeMetamaskAccount, logoutMetamask } = useUserAccount();
  const { readProfileAddress } = useBackend();

  let navigate = useNavigate();

  const [profileImg, setprofileImg] = useState(blankImage);
  const fetchAddress = useCallback(async () => {
    if (address !== undefined) {
      const ProfileRes = await readProfileAddress(address);
      try {
        console.log(ProfileRes);
        if (ProfileRes !== "") {
          setprofileImg(ProfileRes.profileImage);
        } else {
          setprofileImg(blankImage);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [
    address,
    readProfileAddress
  ]);

  useEffect(() => {
    if (address !== undefined){
      fetchAddress();
    }else{
      setprofileImg(blankImage);
    }
    // eslint-disable-next-line
  }, [address]);

  function isLogin() {
    if (address === undefined) {
      return (
        <button
          className="btn btn-outline-secondary mx-3"
          onClick={() => {
            loginMetamask();
          }}
        >
          Connect Wallet
        </button>
      );
    } else {
      return (
        <div className="d-flex align-items-center">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle text-white" type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Create
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link
                  className="dropdown-item text-end" to="/createNFT">
                  Create NFT
                </Link>
              </li>
              <li>
                <Link className="dropdown-item text-end" to="/myCollection">
                  My collection
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown mx-3">
            <button
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="d-flex align-items-center"
            >
              <img className="header_btn_profile" src={profileImg} alt="profilePicture" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="dropdown-item-text text-end">
                {shortenAddress(address)}
              </li>
              <li className="dropdown-item text-end header_cursor_pointer" onClick={() => navigator.clipboard.writeText(address)}>
                Copy address
              </li>
              <li><hr className="dropdown-divider"></hr></li>
              <li>
                <Link className="dropdown-item text-end" to={"/profile/" + address}>
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item text-end" to="/setting">
                  Setting
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item text-end"
                  to="/"
                  onClick={() => {
                    logoutMetamask();
                  }}
                >
                  Disconnect
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      console.log("detected");
    } else {
      console.log("Not detect");
    }
  }, []);

  const [accountsChanged, setAccountsChanged] = useState(false);

  const changeAccount = useCallback(async () => {
    if (address !== undefined) {
      navigate("/");
      await changeMetamaskAccount();
      setAccountsChanged(false);
    }
  }, [address,
    navigate,
    changeMetamaskAccount
  ]);

  useEffect(() => {
    if (address !== undefined) {
      window.ethereum.on("accountsChanged", () => {
        setAccountsChanged(true);
      });
    }
  });

  useEffect(() => {
    if (accountsChanged === true) {
      changeAccount();
    }
    // eslint-disable-next-line
  }, [accountsChanged])

  return (

    <div className="container-fluid py-2 header_nav shadow-sm">
      <div className="row justify-content-between align-items-center">
        <div className="col-auto">
          <div className="d-flex">
            <Link className="d-flex flex-column align-items-center px-3 header_brand" to="/">
              <div className="h6">NFT</div>
              <div className="h6">Marketplace</div>
            </Link>

            <div className="d-flex align-items-center px-3">
              <div className="header_input_form">
                <input
                  className="form-control"
                  placeholder="Search by Collection / User / Address"
                ></input>
              </div>
            </div>

          </div>
        </div>
        <div className="col-auto">
          {isLogin()}
        </div>
      </div>
    </div>
  );
};

export default Header;
