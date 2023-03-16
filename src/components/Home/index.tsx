import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";
import MarketplaceBg from "./MarketplaceBg.png";

import NFTBox from "../boxComponent/NFTBox";
import CollectionBox from "../boxComponent/CollectionBox";

import useBackend from "../../hook/useBackend";
import useCollection from "../../hook/useCollection";
import { getShowData } from "../../utils/randomHelper";

const Home: React.FC = () => {
  //const
  const jCStart = " justify-content-start";
  const jCBetween = " justify-content-between";
  const displayShow = " ";
  const displayNone = " d-none";

  //state
  const [showNft, setShowNft] = useState<any[]>([]);
  const [showCollection, setShowCollection] = useState<any[]>([]);
  const [showSaleNFT, setShowSaleNFT] = useState<any[]>([]);

  //className State
  const [NFTShowState, setNFTShowState] = useState(jCStart);
  const [NFTSaleShowState, setNFTSaleShowState] = useState(jCStart);
  const [ExploreNFT, setExploreNFT] = useState(displayNone);
  const [ExploreCollection, setExploreCollection] = useState(displayNone);
  const [ExploreSale, setExploreSale] = useState(displayNone);

  //hook
  const { readAllTokenId } = useBackend();
  const { getAllCollection } = useCollection();
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

    const allCollectionRes = await getAllCollection();
    try {
      if (allCollectionRes.length > 0) {
        const showCollectionList = getShowData(allCollectionRes, 8);
        setShowCollection(showCollectionList);
        setExploreCollection(displayShow);
      }
    } catch (error) {
      console.log(error);
    }
  }, [getAllCollection, readAllTokenId]);

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
              src={MarketplaceBg}
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
                "d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list"
              }
            >
              {showCollection.map((value: any) => (
                <div className="m-2" key={value.collectionId}>
                  <CollectionBox
                    CollectionId={value.collectionId}
                  ></CollectionBox>
                </div>
              ))}
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
