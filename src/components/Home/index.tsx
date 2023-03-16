import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";

import NFTBox from "../boxComponent/NFTBox";
import CollectionBox from "../boxComponent/CollectionBox";

import useBackend from "../../hook/useBackend";
import useCollection from "../../hook/useCollection";
import { getShowData } from "../../utils/randomHelper";
import { CollectionDataObject, NFTObject } from "./type";

const Home: React.FC = () => {
  //const
  const jCStart = " justify-content-start";
  const jCBetween = " justify-content-between";
  const displayShow = " ";
  const displayNone = " d-none";

  //state
  const [showNft, setShowNft] = useState<NFTObject[]>([]);
  const [showCollection, setShowCollection] = useState<CollectionDataObject[]>(
    []
  );
  const [showSaleNFT, setShowSaleNFT] = useState<NFTObject[]>([]);

  //className State
  const [NFTShowState, setNFTShowState] = useState<string>(jCStart);
  const [NFTSaleShowState, setNFTSaleShowState] = useState<string>(jCStart);
  const [ExploreNFT, setExploreNFT] = useState<string>(displayNone);
  const [ExploreCollection, setExploreCollection] =
    useState<string>(displayNone);
  const [ExploreSale, setExploreSale] = useState<string>(displayNone);

  //hook
  const { readAllTokenId } = useBackend();
  const { getRandomCollection } = useCollection();
  const navigate = useNavigate();

  //handle
  const handleCollectionBtn = () => {
    navigate("/collection/");
  };

  const handleNFTBtn = () => {
    navigate("/viewNFT/");
  };

  const handleNFTSaleBtn = () => {
    navigate("/viewSaleNFT/");
  };

  //fetchdata
  const fetchData = useCallback(async () => {
    const alltokenRes = await readAllTokenId();
    try {
      // setNFTItem(alltokenRes);
      if (alltokenRes.length > 0) {
        const showTokenList = getShowData(alltokenRes, 4);
        setShowNft(showTokenList);
        if (showTokenList.length === 4) {
          setNFTShowState(jCBetween);
        }
        setExploreNFT(displayShow);

        const saleToken = alltokenRes.filter((tokenData: any) => {
          return tokenData.statusSale === true;
        });
        if (saleToken.length > 0) {
          const saleTokenList = getShowData(saleToken, 4);
          setShowSaleNFT(saleTokenList);
          if (saleToken.length === 4) {
            setNFTSaleShowState(jCBetween);
          }
          setExploreSale(displayShow);
        }
      }
    } catch (error) {
      console.log(error);
    }

    const allCollectionRes = await getRandomCollection();
    try {
      if (allCollectionRes.length > 0) {
        setShowCollection(allCollectionRes);
        setExploreCollection(displayShow);
      }
    } catch (error) {
      console.log(error);
    }
  }, [getRandomCollection, readAllTokenId]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="p-0 container-fluid">
        <div className="row">
          <div className="d-flex position-relative justify-content-center align-items-center">
            <img
              src={"/images/background/MarketplaceBg.png"}
              alt="bgProfileImage"
              className="bg-white home_bgImg"
            ></img>
            <div className="d-flex flex-column align-items-center position-absolute home_text ">
              <h1>NFT Marketplace</h1>
              <h5>Discover exclusive digital artworks.</h5>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="mt-4 row justify-content-between align-items-center">
            <h5 className="col-auto mb-0">Explore Collection</h5>
            <div className="col-auto">
              <button
                className="btn btn-outline-secondary"
                onClick={handleCollectionBtn}
              >
                View all
              </button>
            </div>
          </div>
          <div className={"row mt-3 justify-content-center" + ExploreNFT}>
            <div
              className={
                "flex flex-row p-2 justify-center flex-wrap border border-secondary-subtle rounded home_show_list"
              }
            >
              {showCollection.length === 0 ? (
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
                  {showCollection.map((value: any) => {
                    return (
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
                    );
                  })}
                </>
              )}
            </div>
          </div>

          <div className="mt-5 row justify-content-between align-items-center">
            <h5 className="col-auto mb-0">Explore NFT</h5>
            <div className="col-auto">
              <button
                className="btn btn-outline-secondary"
                onClick={handleNFTBtn}
              >
                View all
              </button>
            </div>
          </div>
          <div
            className={"row mt-3 justify-content-center" + ExploreCollection}
          >
            <div
              className={
                "d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list" +
                NFTShowState
              }
            >
              {showNft.map((value: any) => (
                <div key={value.tokenId}>
                  <NFTBox TokenID={value.tokenId}></NFTBox>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 row justify-content-between align-items-center">
            <h5 className="col-auto mb-0">Explore trading NFT</h5>
            <div className="col-auto">
              <button
                className="btn btn-outline-secondary"
                onClick={handleNFTSaleBtn}
              >
                View all
              </button>
            </div>
          </div>
          <div className={"row mt-3 mb-5 justify-content-center" + ExploreSale}>
            <div
              className={
                "d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list" +
                NFTSaleShowState
              }
            >
              {showSaleNFT.map((value: any) => (
                <div key={value.tokenId}>
                  <NFTBox TokenID={value.tokenId}></NFTBox>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
