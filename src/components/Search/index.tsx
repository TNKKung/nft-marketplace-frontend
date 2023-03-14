import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBackend from "../../hook/useBackend";
import "./search.css";
import CollectionBox from "../boxComponent/CollectionBox/CollectionBox";
import NFTBox from "../boxComponent/NFTBox/NFTBox";
import UserBox from "../boxComponent/UserBox/UserBox";
import { ICollectionValue, INFTValue, IUserValue } from "./type";

const Search: React.FC = () => {
  const params = useParams();
  const [loadingClass, setLoadingClass] = useState<string>("");
  const [mainClass1, setMainClass1] = useState<string>("d-none");
  const { getSearchValue } = useBackend();

  const [nftSearchValue, setNftSearchValue] = useState<INFTValue[]>([]);

  const [userSearchValue, setUserSearchValue] = useState<IUserValue[]>([]);

  const [collectionSearchValue, setCollectionSearchValue] = useState<
    ICollectionValue[]
  >([]);

  const fechData = useCallback(async () => {
    const getSearchValueRes = await getSearchValue(params.searchValue);
    setUserSearchValue(getSearchValueRes["user"]);
    setNftSearchValue(getSearchValueRes["nft"]);
    setCollectionSearchValue(getSearchValueRes["collection"]);
    setLoadingClass("d-none");
    setMainClass1("");
  }, [getSearchValue, params]);

  useEffect(() => {
    //first time running
    fechData();
    // eslint-disable-next-line
  }, [params]);

  return (
    <div>
      <div
        className={
          "container-fluid mt-5 d-flex justify-content-center " + loadingClass
        }
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className={mainClass1}>
        <div className="container mt-5">
          <div className="pb-2 mb-2 row align-items-center border-bottom">
            <h4 className="col-auto">Search results : </h4>
            <h4 className="col-auto text-gray-500">{params.searchValue}</h4>
          </div>
          {nftSearchValue.length > 0 ? (
            <div>
              <div className="mt-4 row">
                <h5 className="col-auto">
                  NFT results : {nftSearchValue.length}
                </h5>
              </div>
              <div className="mt-1 row justify-content-center">
                <div className="flex-row flex-wrap p-2 border rounded d-flex border-secondary-subtle search_show_list">
                  {nftSearchValue.map((value: any) => (
                    <div key={value.tokenId}>
                      <NFTBox TokenID={value.tokenId}></NFTBox>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {userSearchValue.length > 0 ? (
            <div>
              <div className="mt-4 row">
                <h5 className="col-auto">
                  User results : {userSearchValue.length}
                </h5>
              </div>
              <div className="mt-1 row justify-content-center">
                <div className="flex-row flex-wrap p-2 border rounded d-flex border-secondary-subtle search_show_list">
                  {userSearchValue.map((value: any) => (
                    <div className="m-2" key={value.address}>
                      <UserBox userAddress={value.address}></UserBox>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {collectionSearchValue.length > 0 ? (
            <div>
              <div className="mt-4 row">
                <h5 className="col-auto">
                  Collection results : {collectionSearchValue.length}
                </h5>
              </div>
              <div className="mt-1 row justify-content-center">
                <div className="flex-row flex-wrap p-2 border rounded d-flex border-secondary-subtle search_show_list">
                  {collectionSearchValue.map((value: any) => (
                    <div className="m-2" key={value.collectionId}>
                      <CollectionBox
                        CollectionId={value.collectionId}
                      ></CollectionBox>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          {userSearchValue.length === 0 &&
          nftSearchValue.length === 0 &&
          collectionSearchValue.length === 0 ? (
            <div>No result found</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Search;
