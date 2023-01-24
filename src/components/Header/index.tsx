import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserAccount } from "../../store/UserAction/hook";
import { shortenAddress } from "../../utils/addressHelper";

const Header: React.FC = () => {
  const [connectBtnText, setConnectBtnText] = useState("Connect");
  const { address, loginMetamask, changeMetamaskAccount, logoutMetamask } = useUserAccount();
  let navigate = useNavigate();

  function isLogin() {
    if (address === undefined) {
      return (
        <li className="nav-item w d-flex align-items-center">
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
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle text-white ms-2" type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
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
                    <Link
                      className="dropdown-item" to="/createNFT">
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
                className="btn btn-secondary dropdown-toggle w-36 truncate whitespace-nowrap"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {address ? shortenAddress(address) : connectBtnText}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {/* <li><hr className="dropdown-divider" /></li> */}
                <li>
                  <Link className="dropdown-item" to={"/profile/" + address}>
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
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm">
      <div className="container-fluid">
        <div className="contrainer-fluid d-flex flex-row align-items-center w-50">
          <Link
            className="navbar-brand mx-3 d-flex flex-column align-items-center"
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
            <div className='me-auto'></div>
            {isLogin()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
