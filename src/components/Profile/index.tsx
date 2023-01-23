import React, { useCallback, useEffect, useState } from 'react'
import blankImage from "./blankImg.png"
import blankBgImage from "./blankBgImg.png"
import "./profile.css"
import { useUserAccount } from "../../store/UserAction/hook";
import { shortenAddress } from "../../utils/addressHelper";
import useBackend from '../../hook/useBackend';
import NFTBox from '../boxComponent/NFTBox/NFTBox';
import { useNavigate, useParams } from 'react-router-dom';


const Profile: React.FC = () => {
  const params = useParams();
  const profileAddress: any = params.walletAddress;
  const { address } = useUserAccount();
  const { readTokenIdFromAddress,
    readProfileAddress,
    checkLikeUser,
    addLikeUser,
    removeLikeUser
  } = useBackend();
  let navigate = useNavigate();

  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileMainImg, setProfileMainImg] = useState(blankImage);
  const [profileBgImg, setProfileBgImg] = useState(blankBgImage);

  const [profileLike, setProfileLike] = useState(false);

  const [ownNftList, setOwnNftList] = useState<any[]>([]);

  const [friendCount, setFriendCount] = useState(0);

  const [onDefaultShowNFT, setOnDefaultShowNFT] = useState<any[]>([]);
  const [filterShowNFTList, setFilterShowNFTList] = useState<any[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [navOwn, setNavOwn] = useState("Profile_nav_select");
  const [navOnsale, setOnsale] = useState("Profile_nav");
  const [navFavorite, setFavorite] = useState("Profile_nav");
  const [navCreated, setCreated] = useState("Profile_nav");

  const resetNav = useCallback(async () => {
    setNavOwn("Profile_nav");
    setOnsale("Profile_nav");
    setFavorite("Profile_nav");
    setCreated("Profile_nav");
    setSearchInput("");
  }, [])

  const navOwnBtn = useCallback(async () => {
    resetNav();
    setOnDefaultShowNFT(ownNftList);
    setFilterShowNFTList(ownNftList);
    setNavOwn("Profile_nav_select");
  }, [resetNav, ownNftList]);

  const navOnsaleBtn = useCallback(async () => {
    resetNav();
    setOnDefaultShowNFT([]);
    setFilterShowNFTList([]);
    setOnsale("Profile_nav_select")
  }, [resetNav]);

  const navFavoriteBtn = useCallback(async () => {
    resetNav();
    setOnDefaultShowNFT([]);
    setFilterShowNFTList([]);
    setFavorite("Profile_nav_select")
  }, [resetNav]);

  const navCreatedBtn = useCallback(async () => {
    resetNav();
    setOnDefaultShowNFT([]);
    setFilterShowNFTList([]);
    setCreated("Profile_nav_select")
  }, [resetNav]);

  const handleSearch = useCallback(async (e: any) => {
    setSearchInput(e.target.value);

    const includeNFT = onDefaultShowNFT.filter((nft: any) => {
      return nft.nameNFT.toLowerCase().includes(e.target.value.toLowerCase());
    });

    if (JSON.stringify(filterShowNFTList) !== JSON.stringify(includeNFT)) {
      setFilterShowNFTList(includeNFT);
    }
  }, [onDefaultShowNFT, filterShowNFTList]);

  const handleAddFriend = useCallback(async () => {
    setProfileLike(true);
    addLikeUser(profileAddress, address);
  }, [profileAddress,
    address,
    addLikeUser
  ]);

  const handleRemoveFriend = useCallback(async () => {
    setProfileLike(false);
    removeLikeUser(profileAddress, address);
  }, [profileAddress,
    address,
    removeLikeUser]);

  const handleSetting = useCallback(async () => {
    navigate("/setting");
  }, [navigate]);

  const fetchData = useCallback(async () => {
    const OwnNFTListRes = await readTokenIdFromAddress(profileAddress);
    try {
      setOwnNftList(OwnNFTListRes);
      setOnDefaultShowNFT(OwnNFTListRes);
      setFilterShowNFTList(OwnNFTListRes);
    } catch (error) {
      console.log(error);
    }

    const profileDataRes = await readProfileAddress(profileAddress);
    try {
      console.log(profileDataRes);
      setProfileName(profileDataRes.name);
      setProfileBio(profileDataRes.bio);
      if(profileDataRes.profileImage !== ""){
        setProfileMainImg(profileDataRes.profileImage);
      }
      if(profileDataRes.backgroundImage !== ""){
        setProfileBgImg(profileDataRes.backgroundImage);
      }
      setFriendCount(profileDataRes.friendList.length);
    } catch (error) {
      console.log(error);
    }
    if (profileAddress !== address) {
      const checkProfileLike = await checkLikeUser(profileAddress, address);
      try {
        console.log(checkProfileLike);
        setProfileLike(checkProfileLike);
      } catch (error) {
        console.log(error);
      }
    }

  }, [readTokenIdFromAddress,
    readProfileAddress,
    profileAddress,
    address,
    checkLikeUser
  ]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const [mapShowNFT, setMapShowNFT] = useState<any[]>([]);
  const ResetMapShowNFT = useCallback(() => {
    setMapShowNFT([]);
  }, []);

  useEffect(() => {
    ResetMapShowNFT();
  }, [ResetMapShowNFT,
    filterShowNFTList]);

  const NewMapShowNFT = useCallback(() => {
    if (mapShowNFT.length === 0) {
      let mapNFTList: any = [];
      let count = 0;
      filterShowNFTList.forEach(mapNFT => {
        mapNFTList.push(
          <div key={count}>
            <NFTBox TokenID={Number(mapNFT.tokenId).toString()}></NFTBox>
          </div>);
        count += 1;
      });
      setMapShowNFT(mapNFTList);
    }
  }, [filterShowNFTList,
    mapShowNFT
  ]);

  useEffect(() => {
    NewMapShowNFT();
  }, [mapShowNFT])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 p-0 position-relative">
          <img src={profileBgImg} alt="bgProfileImage" className="Profile_bgProfileImg bg-gray-300"></img>
        </div>
      </div>

      <div className="row">
        <div className="col-12 position-relative" style={{ top: "-65px" }}>
          <div className="container">
            <div className="row">

              <div className="col-auto">
                <img src={profileMainImg} alt="profileImage" className="bg-gray-800 rounded-circle Profile_profileImg"></img>
              </div>

              <div className="col px-0 align-self-end">
                <div className="container-fluid ps-4">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto h3 p-0 m-0">{profileName}</div>
                    <div className="col-auto">{address === profileAddress ?
                      <button className="btn btn-outline-secondary" onClick={handleSetting}><i className="bi bi-sliders"></i> Setting</button> :
                      profileLike === true ?
                        <button className="btn btn-secondary" onClick={handleRemoveFriend}>Remove friend</button> :
                        <button className="btn btn-outline-secondary" onClick={handleAddFriend}>Add friend</button>}
                    </div>
                  </div>
                  <div className="row my-2"><div className="col-auto border border-secondary rounded">{shortenAddress(profileAddress)}</div></div>
                  <div className="row"><div className="col-auto border border-secondary rounded">friend {friendCount} people</div></div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">Bio : {profileBio}</div>
              </div>

              <div className="row mt-4">
                <div className="container-fluid p-0">
                  <div className="row justify-content-between align-items-center">

                    <div className="col-auto p-0">
                      <div className="container-fluid p-0">
                        <div className="row">
                          <button className={"col-auto fs-5 Profile_nav " + navOwn} onClick={navOwnBtn}>Own</button>
                          <button className={"col-auto fs-5 Profile_nav " + navOnsale} onClick={navOnsaleBtn}>Onsale</button>
                          <button className={"col-auto fs-5 Profile_nav " + navFavorite} onClick={navFavoriteBtn}>Favorite</button>
                          <button className={"col-auto fs-5 Profile_nav " + navCreated} onClick={navCreatedBtn}>Created</button>
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
                              placeholder="Search" onChange={handleSearch}>
                            </input>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto">
                      <div className="d-flex flex-row p-2 mt-3 flex-wrap border border-secondary-subtle rounded nft_show_list">
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
  )
}
export default Profile;