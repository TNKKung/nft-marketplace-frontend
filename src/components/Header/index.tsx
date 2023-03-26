import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./header.css";

import { IconSearch } from "../Icon";

import useBackend from "../../hook/useBackend";
import { useUserAccount } from "../../store/UserAction/hook";
import { shortenAddress } from "../../utils/addressHelper";

const Header: React.FC = () => {
  const {
    address,
    profileImg,
    reducer: {
      loginMetamask,
      changeMetamaskAccount,
      logoutMetamask,
      changeImgProfile,
    },
  } = useUserAccount();
  const { readProfileAddress } = useBackend();

  let navigate = useNavigate();

  const [accountsChanged, setAccountsChanged] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchAddress = useCallback(async () => {
    if (address !== undefined) {
      const ProfileRes = await readProfileAddress(address);
      try {
        console.log(ProfileRes);
        if (ProfileRes.profileImage !== "") {
          changeImgProfile(ProfileRes.profileImage);
        } else {
          changeImgProfile("/images/blank/blankImg.png");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [address, readProfileAddress, changeImgProfile]);

  const handleConnectBtn = () => {
    loginMetamask();
  };

  useEffect(() => {
    if (address !== undefined) {
      fetchAddress();
    } else {
      // setprofileImg(blankImage);
      changeImgProfile("/images/blank/blankImg.png");
    }
    // eslint-disable-next-line
  }, [address]);

  function isLogin() {
    if (address === undefined) {
      return (
        <button
          className="mx-3 btn btn-outline-secondary"
          onClick={handleConnectBtn}
        >
          Connect Wallet
        </button>
      );
    } else {
      return (
        <div className="d-flex align-items-center">
          <div className="dropdown header_create_btn">
            <button
              className="text-white btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Create
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item text-end" to="/createNFT">
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
          <div className="mx-3 dropdown">
            <button
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="d-flex align-items-center"
            >
              <img
                className="header_btn_profile"
                src={profileImg}
                alt="profilePicture"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="dropdown-item-text text-end">
                {shortenAddress(address)}
              </li>
              <li
                className="dropdown-item text-end header_cursor_pointer"
                onClick={() => navigator.clipboard.writeText(address)}
              >
                Copy address
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <div className="header_profile_create">
                <li>
                  <Link className="dropdown-item text-end" to="/createNFT">
                    Create NFT
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-end" to="/myCollection">
                    My collection
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
              </div>
              <li>
                <Link
                  className="dropdown-item text-end"
                  to={"/profile/" + address}
                >
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

  const changeAccount = useCallback(async () => {
    if (address !== undefined) {
      navigate("/");
      await changeMetamaskAccount();
      setAccountsChanged(false);
    }
  }, [address, navigate, changeMetamaskAccount]);

  const handleSearchBtn = useCallback(() => {
    if (searchInput !== "") {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
    } else {
      navigate("/");
    }
  }, [searchInput, navigate]);
  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    []
  );
  const handleEnterEvent = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearchBtn();
      }
    },
    [handleSearchBtn]
  );

  useEffect(() => {
    if (address !== undefined) {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", () => {
          setAccountsChanged(true);
        });
      }
    }
  });

  useEffect(() => {
    if (accountsChanged === true) {
      changeAccount();
    }
    // eslint-disable-next-line
  }, [accountsChanged]);

  return (
    <div className="py-2 shadow-sm container-fluid header_nav">
      <div className="row justify-content-between align-items-center">
        <div className="col-auto">
          <div className="d-flex">
            <Link
              className="px-3 d-flex flex-column align-items-center header_brand"
              to="/"
            >
              <div className="h6">NFT</div>
              <div className="h6">Marketplace</div>
            </Link>

            <div className="px-3 space-x-2 d-flex align-items-center">
              <div className="w-full p-2 border rounded-md">
                <IconSearch className="absolute w-5 h-5 translate-x-1 translate-y-0.5" />
                <div className="pl-8 header_input_form me-3">
                  <input
                    className="w-full outline-none"
                    placeholder="Search by Collection / User / Address"
                    value={searchInput}
                    onChange={handleSearchInput}
                    onKeyDown={handleEnterEvent}
                  />
                </div>
              </div>
              <button
                className="btn btn-outline-secondary"
                onClick={handleSearchBtn}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-auto">{isLogin()}</div>
      </div>
    </div>
  );
};

export default Header;
