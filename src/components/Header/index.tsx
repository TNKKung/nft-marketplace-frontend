import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserAccount } from "../../store/UserAction/hook";
import { shortenAddress } from "../../utils/addressHelper";

const Header: React.FC = () => {
  const [connectBtnText, setConnectBtnText] = useState("Connect");
  const { address, loginMetamask, changeMetamaskAccount, logoutMetamask } =
    useUserAccount();
  let navigate = useNavigate();

  function isLogin() {
    if (address === undefined) {
      return (
        <li className="nav-item w d-flex align-items-center">
          <button
            className="text-white nav-link btn btn-secondary"
            onClick={() => {
              loginMetamask();
            }}
          >
            Connect Wallet
          </button>
        </li>
      );
    } else {
      return (
        <div className="d-flex">
          <li className="nav-item w-50 me-auto">
            <div className="nav-link d-flex align-items-center">
              <div className="dropdown">
                <button
                  className="text-white btn btn-secondary dropdown-toggle ms-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Create
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {/* <li><hr className="dropdown-divider" /></li> */}
                  <li>
                    <Link className="dropdown-item" to="/myCollection">
                      My collection
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/createNFT">
                      Create NFT
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="nav-item d-flex align-items-center">
            <div className="dropdown">
              <button
                className="truncate btn btn-secondary dropdown-toggle w-36 whitespace-nowrap"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {address ? shortenAddress(address) : connectBtnText}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {/* <li><hr className="dropdown-divider" /></li> */}
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/setting">
                    Setting
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
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
          </li>
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

  useEffect(() => {
    if (address === undefined) {
      setConnectBtnText("Connect");
    } else {
      setConnectBtnText(address);
    }
  }, [address]);

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      if (address !== undefined) {
        changeMetamaskAccount();
        navigate("/");
      }
    });
  }, [address, changeMetamaskAccount, navigate]);

  return (
    <nav className="shadow-sm navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid">
        <div className="flex-row contrainer-fluid d-flex align-items-center w-50">
          <Link
            className="mx-3 navbar-brand d-flex flex-column align-items-center"
            to="/"
          >
            <div className="h6">NFT</div>
            <div className="h6">Marketplace</div>
          </Link>
          <div className="w-100">
            <input
              className="form-control"
              placeholder="Search by Collection / User / Address"
            ></input>
          </div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav w-100">
            <div className="me-auto"></div>
            {isLogin()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
