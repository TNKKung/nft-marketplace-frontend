import React, { useState, useEffect } from "react";

import { useUserAccount } from "../../store/UserAction/hook";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [connectBtnText, setConnectBtnText] = useState("Connect");
  const { address, loginMetamask } = useUserAccount();

  function isLogin() {
    if (address === undefined) {
      return (
        <li className="nav-item d-flex align-items-center">
          <button
            className="nav-link btn btn-secondary text-white"
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
              <Link
                className="btn btn-secondary text-white ms-2"
                to="/createNFT"
              >
                Create
              </Link>
            </div>
          </li>
          <li className="nav-item d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {connectBtnText}
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
                      loginMetamask();
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

  window.ethereum.on("accountsChanged", () => {
    if (address !== undefined) {
      window.location.reload();
    }
  });

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top shadow">
      <div className="container-fluid">
        <Link
          className="navbar-brand mx-3 d-flex flex-column align-items-center"
          to="/"
        >
          <div className="h6">NFT</div>
          <div className="h6">Marketplace</div>
        </Link>
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
            <li className="nav-item w-50 me-auto">
              <div className="nav-link d-flex align-items-center">
                <input
                  className="form-control w-50"
                  placeholder="Search by Collection / User / Address"
                ></input>
                <button className="btn btn-secondary text-white dropdown-toggle ms-2">
                  Filter
                </button>
              </div>
            </li>
            {isLogin()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
