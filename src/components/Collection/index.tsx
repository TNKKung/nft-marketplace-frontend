import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./collection.css";
import EditCollection from "./editCollection/EditCollection";

import NFTBox from "../boxComponent/NFTBox";
import BlankImg from "../Profile/blankImg.png";
import DeleteCollection from "../MyCollection/DeleteCollection/DeleteCollection";

import { useUserAccount } from "../../store/UserAction/hook";
import useCollection from "../../hook/useCollection";
import { shortenAddress } from "../../utils/addressHelper";
import useBackend from "../../hook/useBackend";

const Collection: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getCollectionbyId } = useCollection();
  const { readTokenIdData } = useBackend();
  const { address } = useUserAccount();

  const [deleteCollection, setDeleteCollection] = useState(false);
  const handleDeleteCollection = useCallback(() => {
    if (deleteCollection === true) {
      setDeleteCollection(false);
    } else {
      setDeleteCollection(true);
    }
  }, [deleteCollection]);

  const [editCollection, setEditCollection] = useState(false);
  const handleEditCollection = useCallback(() => {
    if (editCollection === true) {
      setEditCollection(false);
    } else {
      setEditCollection(true);
    }
  }, [editCollection]);

  const setNewCollection = useCallback((Name: string, description: string) => {
    setCollectionName(Name);
    setCollectionDescription(description);
  }, []);

  const [loadingDataClass, setLoadingDataClass] = useState("placeholder");
  const [profileImg, setProfileImg] = useState<string>(BlankImg);
  const [collectionObject, setCollectionObject] = useState<any>({});
  const [collectionName, setCollectionName] = useState("Collection Name");
  const [collectionOwner, setCollectionOwner] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [collectionDescription, setCollectionDescription] =
    useState("Description");
  const [collectionListNFT, setCollectionListNFT] = useState<any>([]);
  const [filterNFTlist, setFilterNFTList] = useState<any>([]);
  const [searchFilterInput, setSearchFilterInput] = useState<any>([]);

  const fetchData = useCallback(async () => {
    if (params.collectionId !== undefined) {
      const collectionDescriptRes = await getCollectionbyId(
        params.collectionId
      );
      // console.log(collectionDescriptRes);
      try {
        setCollectionObject(collectionDescriptRes);
        setCollectionName(collectionDescriptRes.collectionName);
        setCollectionOwner(collectionDescriptRes.owner);
        try {
          const listNft = collectionDescriptRes.listNFT.length;
          if (listNft > 0) {
            const indexNFT = await Math.floor(Math.random() * listNft);
            const tokenIDData = await readTokenIdData(
              collectionDescriptRes.listNFT[indexNFT].tokenId.toString()
            );
            setProfileImg(tokenIDData.tokenURI);
          } else {
            setProfileImg(BlankImg);
          }
        } catch (error) {
          console.log(error);
        }
        setCollectionDescription(collectionDescriptRes.description);
        setCollectionListNFT(collectionDescriptRes.listNFT);
        setFilterNFTList(collectionDescriptRes.listNFT);
        setLoadingDataClass("");
      } catch (error) {
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  }, [params.collectionId, navigate, getCollectionbyId, readTokenIdData]);

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchFilterInput(e.target.value);
      if (e.target.value === "") {
        setFilterNFTList(collectionListNFT);
      } else {
        const filterCollection = collectionListNFT.filter(
          (collection: any, index: number) =>
            collection.nameNFT.includes(e.target.value)
        );
        setFilterNFTList(filterCollection);
      }
    },
    [collectionListNFT]
  );

  const backToMyCollection = useCallback(() => {
    navigate("/myCollection", { replace: true });
  }, [navigate]);

  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_FRONTEND_URL}/collection/${params.collectionId}`
    );
  }, [params]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid">
      <div className="py-5 row bg-gray-50">
        <div className="col">
          <div className="container">
            <div className="flex flex-row justify-content-between">
              <img
                src={profileImg}
                alt="userProfileImg"
                className="bg-gray-300 rounded-circle collection_profileImg"
              ></img>

              <div className="w-100">
                <div className="container-fluid">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <h4 className={"m-0 " + loadingDataClass}>
                        {collectionName}
                      </h4>
                    </div>
                    <div className="col-auto">
                      <div className="flex-row d-flex">
                        <button
                          className="mx-1 btn btn-secondary"
                          onClick={copyUrl}
                        >
                          <i className="bi bi-share-fill"></i> Copy link
                        </button>
                        {collectionOwner !== address ? null : (
                          <div>
                            <button
                              className="mx-1 btn btn-secondary"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="bi bi-three-dots"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <button
                                  className="dropdown-item text-end"
                                  onClick={handleEditCollection}
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-end"
                                  onClick={handleDeleteCollection}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className={"col-auto " + loadingDataClass}>
                      Owned by <span>{shortenAddress(collectionOwner)}</span>
                    </div>
                  </div>
                  <div className="mt-2 row ps-2">
                    <div className={"col-auto text-muted " + loadingDataClass}>
                      {collectionDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 row">
        <div className="col">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    className="form-control"
                    placeholder="Search"
                    onChange={handleSearchInput}
                    value={searchFilterInput}
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex-row flex-wrap mt-3 d-flex">
              {filterNFTlist.map((obj: any, index: number) => (
                <NFTBox
                  key={obj.tokenId}
                  TokenID={obj.tokenId.toString()}
                ></NFTBox>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DeleteCollection
        popupState={deleteCollection}
        setPopup={setDeleteCollection}
        setCollectionList={backToMyCollection}
        collectionObject={collectionObject}
      ></DeleteCollection>
      <EditCollection
        setPopup={setEditCollection}
        popupState={editCollection}
        setCollection={setNewCollection}
        collectionId={params.collectionId}
      ></EditCollection>
    </div>
  );
};
export default Collection;
