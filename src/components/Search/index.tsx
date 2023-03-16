import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBackend from "../../hook/useBackend";
import "./search.css";

import CollectionBox from "../boxComponent/CollectionBox";
import NFTBox from "../boxComponent/NFTBox";
import UserBox from "../boxComponent/UserBox";

import { ICollectionValue, INFTValue, IUserValue } from "./type";

const Search: React.FC = () => {
  const params = useParams();
  const [loadingClass, setLoadingClass] = useState<string>("");
  const [mainClass1, setMainClass1] = useState<string>("d-none");
  const { getSearchNFTValue, getSearchCollectionValue, getSearchUserValue } =
    useBackend();

  const [nftSearchValue, setNftSearchValue] = useState<INFTValue[]>([]);

  const [userSearchValue, setUserSearchValue] = useState<IUserValue[]>([]);

  const [collectionSearchValue, setCollectionSearchValue] = useState<
    ICollectionValue[]
  >([]);

  const fechData = useCallback(async () => {
    const getSearchNFTValueRes = await getSearchNFTValue(params.searchValue);
    setNftSearchValue(getSearchNFTValueRes);
    const getSearchUserValueRes = await getSearchUserValue(params.searchValue);
    setUserSearchValue(getSearchUserValueRes);
    const getSearchCollectionValueRes = await getSearchCollectionValue(
      params.searchValue
    );
    setCollectionSearchValue(getSearchCollectionValueRes);
    setLoadingClass("d-none");
    setMainClass1("");
  }, [
    getSearchCollectionValue,
    getSearchNFTValue,
    getSearchUserValue,
    params.searchValue,
  ]);

  useEffect(() => {
    //first time running
    fechData();
    // eslint-disable-next-line
  }, [params]);

  return (
    <div className="h-full pb-10">
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
                  {nftSearchValue.length === 0 ? (
                    <div
                      className={
                        "container-fluid py-10 d-flex justify-content-center "
                      }
                    >
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {nftSearchValue.map((value: any) => (
                        <div key={value.tokenId}>
                          <NFTBox TokenID={value.tokenId}></NFTBox>
                        </div>
                      ))}
                    </>
                  )}
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
                  {collectionSearchValue.length === 0 ? (
                    <div
                      className={
                        "container-fluid py-10 d-flex justify-content-center "
                      }
                    >
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {collectionSearchValue.map((value: any) => (
                        <div className="m-2" key={value.collectionId}>
                          <CollectionBox
                            owner={value.owner}
                            description={value.description}
                            collectionId={value.collectionId}
                            collectionName={value.collectionName}
                            nftImage={value.nftImage}
                            ownerName={value.ownerName}
                            profileImage={value.profileImage}
                          />
                        </div>
                      ))}
                    </>
                  )}
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
