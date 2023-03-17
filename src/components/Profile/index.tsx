import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./profile.css";

import ModalFriendList from "./ModalFriendList";

import NFTBox from "../boxComponent/NFTBox";

import { useUserAccount } from "../../store/UserAction/hook";
import { shortenAddress } from "../../utils/addressHelper";
import useBackend from "../../hook/useBackend";
import { NFTObject } from "./type";

const Profile: React.FC = () => {
  const params = useParams();
  const profileAddress: any = params.walletAddress;
  const { address } = useUserAccount();
  const {
    readTokenIdFromAddress,
    readProfileAddress,
    checkLikeUser,
    addLikeUser,
    removeLikeUser,
    readTokenIdCreatedByOwner,
  } = useBackend();
  let navigate = useNavigate();

  const [profileName, setProfileName] = useState("");
  const [showModalFavoriteList, setShowModalFavoriteList] =
    useState<boolean>(false);
  const [profileBio, setProfileBio] = useState<string>("");
  const [profileTwitter, setProfileTwitter] = useState<string>("");
  const [profileIg, setProfileIg] = useState<string>("");
  const [profileContact, setProfileContact] = useState<string>("");
  const [profileMainImg, setProfileMainImg] = useState<string>(
    "/images/blank/blankImg.png"
  );
  const [profileBgImg, setProfileBgImg] = useState<string>(
    "/images/blank/blankBgImg.png"
  );

  const [profileLike, setProfileLike] = useState<boolean>(false);

  const [ownNftList, setOwnNftList] = useState<NFTObject[]>([]);
  const [favoriteNftList, setFavoriteNftList] = useState<any[]>([]);
  const [onSaleList, setOnSaleList] = useState<any[]>([]);
  const [createdList, setCreatedList] = useState<any[]>([]);

  const [friendList, setFriendList] = useState<any[]>();

  const [onDefaultShowNFT, setOnDefaultShowNFT] = useState<NFTObject[]>([]);
  const [filterShowNFTList, setFilterShowNFTList] = useState<NFTObject[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [navOwn, setNavOwn] = useState("Profile_nav_select");
  const [navOnsale, setOnsale] = useState("Profile_nav");
  const [navFavorite, setFavorite] = useState("Profile_nav");
  const [navCreated, setCreated] = useState("Profile_nav");

  const handleOpenModalFavorite = useCallback(() => {
    setShowModalFavoriteList(true);
  }, []);

  const handleCloseModalFavorite = useCallback(() => {
    setShowModalFavoriteList(false);
  }, []);

  const resetNav = useCallback(async () => {
    setNavOwn("Profile_nav");
    setOnsale("Profile_nav");
    setFavorite("Profile_nav");
    setCreated("Profile_nav");
    setSearchInput("");
  }, []);

  const navOwnBtn = useCallback(async () => {
    resetNav();
    setOnDefaultShowNFT(ownNftList);
    setFilterShowNFTList(ownNftList);
    setNavOwn("Profile_nav_select");
  }, [resetNav, ownNftList]);

  const navOnsaleBtn = useCallback(async () => {
    resetNav();
    setOnDefaultShowNFT(onSaleList);
    setFilterShowNFTList(onSaleList);
    setOnsale("Profile_nav_select");
  }, [resetNav, onSaleList]);

  const navFavoriteBtn = useCallback(async () => {
    resetNav();
    setOnDefaultShowNFT(favoriteNftList);
    setFilterShowNFTList(favoriteNftList);
    setFavorite("Profile_nav_select");
  }, [resetNav, favoriteNftList]);

  const navCreatedBtn = useCallback(async () => {
    resetNav();
    setOnDefaultShowNFT(createdList);
    setFilterShowNFTList(createdList);
    setCreated("Profile_nav_select");
  }, [resetNav, createdList]);

  const handleSearch = useCallback(
    async (e: any) => {
      setSearchInput(e.target.value);

      const includeNFT = onDefaultShowNFT.filter((nft: any) => {
        return nft.nameNFT.toLowerCase().includes(e.target.value.toLowerCase());
      });

      if (JSON.stringify(filterShowNFTList) !== JSON.stringify(includeNFT)) {
        setFilterShowNFTList(includeNFT);
      }
    },
    [onDefaultShowNFT, filterShowNFTList]
  );

  const handleAddFriend = useCallback(async () => {
    setProfileLike(true);
    addLikeUser(profileAddress, address);
  }, [profileAddress, address, addLikeUser]);

  const handleRemoveFriend = useCallback(async () => {
    setProfileLike(false);
    removeLikeUser(profileAddress, address);
  }, [profileAddress, address, removeLikeUser]);

  const handleSetting = useCallback(async () => {
    navigate("/setting");
  }, [navigate]);

  const fetchData = useCallback(async () => {
    const OwnNFTListRes = await readTokenIdFromAddress(profileAddress);
    try {
      setOwnNftList(OwnNFTListRes);
      setOnDefaultShowNFT(OwnNFTListRes);
      setFilterShowNFTList(OwnNFTListRes);
      setOnSaleList(
        OwnNFTListRes.filter((NftList: any) => {
          return NftList.statusSale === true;
        })
      );
    } catch (error) {
      console.log(error);
    }

    const profileDataRes = await readProfileAddress(profileAddress);
    try {
      console.log(profileDataRes);

      setProfileName(profileDataRes.name);
      setProfileBio(profileDataRes.bio);
      setFavoriteNftList(profileDataRes.favoriteNFT);
      setProfileContact(profileDataRes.contact);
      setProfileIg(profileDataRes.instagram);
      setProfileTwitter(profileDataRes.twitter);
      try {
        const createdNFTRes = await readTokenIdCreatedByOwner(address);
        setCreatedList(createdNFTRes);
      } catch (error) {
        console.log(error);
      }

      if (profileDataRes.profileImage !== "") {
        setProfileMainImg(profileDataRes.profileImage);
      } else {
        setProfileMainImg("/images/blank/blankImg.png");
      }
      if (profileDataRes.backgroundImage !== "") {
        setProfileBgImg(profileDataRes.backgroundImage);
      } else {
        setProfileBgImg("/images/blank/blankBgImg.png");
      }
      setFriendList(profileDataRes.friendList);
    } catch (error) {
      console.log(error);
    }
    if (profileAddress !== address) {
      const checkProfileLike = await checkLikeUser(profileAddress, address);
      try {
        setProfileLike(checkProfileLike);
      } catch (error) {
        console.log(error);
      }
    }
  }, [
    readTokenIdFromAddress,
    readProfileAddress,
    profileAddress,
    address,
    checkLikeUser,
    readTokenIdCreatedByOwner,
  ]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [profileAddress]);

  const [mapShowNFT, setMapShowNFT] = useState<any[]>([]);
  const NewMapShowNFT = useCallback(() => {
    let mapNFTList: any = [];
    filterShowNFTList.forEach((mapNFT) => {
      mapNFTList.push(
        <div key={mapNFT.tokenId}>
          <NFTBox
            tokenId={mapNFT.tokenId}
            URLImage={mapNFT.tokenURI}
            collection={""}
            NFTname={mapNFT.nameNFT}
            saleNFTStatus={mapNFT.statusSale}
            price={mapNFT.price}
          ></NFTBox>
        </div>
      );
    });
    setMapShowNFT(mapNFTList);
  }, [filterShowNFTList]);

  useEffect(() => {
    NewMapShowNFT();
    // eslint-disable-next-line
  }, [filterShowNFTList]);

  return (
    <>
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="p-0 col-12 position-relative">
            <img
              src={profileBgImg}
              alt="bgProfileImage"
              className="bg-gray-300 Profile_bgProfileImg"
            ></img>
          </div>
        </div>

        <div className="row">
          <div className="col-12 position-relative" style={{ top: "-65px" }}>
            <div className="container">
              <div className="row">
                <div className="col-auto">
                  <img
                    src={profileMainImg}
                    alt="profileImage"
                    className="bg-gray-800 rounded-circle Profile_profileImg"
                  ></img>
                </div>

                <div className="px-0 col align-self-end">
                  <div className="container-fluid ps-4">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-auto p-0 m-0 h3">{profileName}</div>
                      <div className="col-auto">
                        {address === profileAddress ? (
                          <button
                            className="btn btn-outline-secondary"
                            onClick={handleSetting}
                          >
                            <i className="bi bi-sliders"></i> Setting
                          </button>
                        ) : address === undefined ? null : profileLike ===
                          true ? (
                          <button
                            className="btn btn-secondary"
                            onClick={handleRemoveFriend}
                          >
                            Remove favorite
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-secondary"
                            onClick={handleAddFriend}
                          >
                            Add favorite
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="my-2 row">
                      <div className="col-auto border rounded border-secondary">
                        {shortenAddress(profileAddress)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="py-0 -translate-x-3 border btn border-secondary"
                      onClick={handleOpenModalFavorite}
                    >
                      favorite people {friendList?.length}
                    </button>
                  </div>
                </div>

                {profileBio === "" ? null : (
                  <div className="mt-3 row">
                    <div className="col fw-bold">
                      Bio : <span className="fw-normal">{profileBio}</span>
                    </div>
                  </div>
                )}
                {profileTwitter === "" ? null : (
                  <div className="mt-1 row">
                    <div className="col fw-bold">
                      Twitter :{" "}
                      <span className="fw-normal">{profileTwitter}</span>
                    </div>
                  </div>
                )}
                {profileIg === "" ? null : (
                  <div className="mt-1 row">
                    <div className="col fw-bold">
                      Instagram : <span className="fw-normal">{profileIg}</span>
                    </div>
                  </div>
                )}
                {profileContact === "" ? null : (
                  <div className="mt-1 row">
                    <div className="col fw-bold">
                      Contact :{" "}
                      <span className="fw-normal">{profileContact}</span>
                    </div>
                  </div>
                )}
                <div className="mt-4 row">
                  <div className="p-0 container-fluid">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-auto p-0">
                        <div className="p-0 container-fluid">
                          <div className="row">
                            <button
                              className={"col-auto fs-5 Profile_nav " + navOwn}
                              onClick={navOwnBtn}
                            >
                              Own
                            </button>
                            <button
                              className={
                                "col-auto fs-5 Profile_nav " + navOnsale
                              }
                              onClick={navOnsaleBtn}
                            >
                              Onsale
                            </button>
                            <button
                              className={
                                "col-auto fs-5 Profile_nav " + navFavorite
                              }
                              onClick={navFavoriteBtn}
                            >
                              Favorite
                            </button>
                            <button
                              className={
                                "col-auto fs-5 Profile_nav " + navCreated
                              }
                              onClick={navCreatedBtn}
                            >
                              Created
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-auto p-0">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-auto p-0">
                              <input
                                className="form-control"
                                value={searchInput}
                                placeholder="Search"
                                onChange={handleSearch}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-center align-items-center">
                      <div className="col-auto">
                        <div className="flex-row flex-wrap p-2 mt-3 border rounded d-flex border-secondary-subtle nft_show_list">
                          {mapShowNFT}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalFavoriteList && (
        <ModalFriendList
          isOpen={showModalFavoriteList}
          handleClose={handleCloseModalFavorite}
          friendList={friendList}
        />
      )}
    </>
  );
};
export default Profile;
