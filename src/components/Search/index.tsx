import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBackend from "../../hook/useBackend";
import "./search.css";

import CollectionBox from "../boxComponent/CollectionBox";
import NFTBox from "../boxComponent/NFTBox";
import UserBox from "../boxComponent/UserBox";

import { ICollectionValue, INFTValue, IUserValue } from "./type";
import BlankCollectionCard from "../BlankCard/BlankCollectionCard";
import BlankNFTCard from "../BlankCard/BlankNFTCard";

const Search: React.FC = () => {
  const params = useParams();
  const { getSearchNFTValue, getSearchCollectionValue, getSearchUserValue } =
    useBackend();

  const [nftSearchValue, setNftSearchValue] = useState<INFTValue[]>([]);

  const mockArray = [0, 1, 2, 4];
  const [userSearchValue, setUserSearchValue] = useState<IUserValue[]>([]);

  const [collectionSearchValue, setCollectionSearchValue] = useState<
    ICollectionValue[]
  >([]);

  const [loadingNFTs, setLoadingNFTs] = useState<boolean>(false);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(false);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

  const fetchDataNFTs = useCallback(async () => {
    setLoadingNFTs(true);
    try {
      const getSearchNFTValueRes = await getSearchNFTValue(params.searchValue);
      setNftSearchValue(getSearchNFTValueRes);
    } catch (error) {
      console.log(error);
    }
    setLoadingNFTs(false);
  }, [getSearchNFTValue, params.searchValue]);

  const fetchDataCollections = useCallback(async () => {
    setLoadingCollections(true);
    try {
      const getSearchCollectionValueRes = await getSearchCollectionValue(
        params.searchValue
      );
      setCollectionSearchValue(getSearchCollectionValueRes);
    } catch (error) {
      console.log(error);
    }
    setLoadingCollections(false);
  }, [getSearchCollectionValue, params.searchValue]);

  const fetchDataUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const getSearchUserValueRes = await getSearchUserValue(
        params.searchValue
      );
      setUserSearchValue(getSearchUserValueRes);
    } catch (error) {
      console.log(error);
    }
    setLoadingUsers(false);
  }, [getSearchUserValue, params.searchValue]);

  useEffect(() => {
    //first time running
    fetchDataNFTs();
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    //first time running
    fetchDataUsers();
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    //first time running
    fetchDataCollections();
    // eslint-disable-next-line
  }, [params]);

  return (
    <div className="h-full pb-10">
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
                {loadingNFTs ? (
                  <>
                    {mockArray.map(() => (
                      <BlankNFTCard />
                    ))}
                  </>
                ) : (
                  <>
                    {nftSearchValue.map((value: any) => (
                      <div key={value.tokenId}>
                        <NFTBox
                          tokenId={value.tokenId}
                          URLImage={value.tokenURI}
                          collection={""}
                          NFTname={value.nameNFT}
                          saleNFTStatus={value.statusSale}
                          price={value.price}
                        ></NFTBox>
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
                {loadingUsers ? (
                  <>
                    {mockArray.map(() => (
                      <BlankCollectionCard />
                    ))}
                  </>
                ) : (
                  <>
                    {userSearchValue.map((value: any) => (
                      <div className="m-2" key={value.address}>
                        <UserBox userAddress={value.address}></UserBox>
                      </div>
                    ))}
                  </>
                )}
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
                {loadingCollections ? (
                  <>
                    {mockArray.map(() => (
                      <BlankCollectionCard />
                    ))}
                  </>
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
  );
};
export default Search;
