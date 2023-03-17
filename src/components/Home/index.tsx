import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";

import NFTBox from "../boxComponent/NFTBox";
import CollectionBox from "../boxComponent/CollectionBox";

import useBackend from "../../hook/useBackend";
import useCollection from "../../hook/useCollection";
import { CollectionDataObject, NFTObject } from "./type";
import { IconSpin } from "../Icon";
import BlankCollectionCard from "../BlankCard/BlankCollectionCard";
import BlankNFTCard from "../BlankCard/BlankNFTCard";

const Home: React.FC = () => {
  //state
  const MockWait = [0, 1, 2, 3];
  const [showNft, setShowNft] = useState<NFTObject[]>([]);
  const [showCollection, setShowCollection] = useState<CollectionDataObject[]>(
    []
  );
  const [showSaleNFT, setShowSaleNFT] = useState<NFTObject[]>([]);

  //className State

  const [loadingRandomNFT, setLoadingRandomNFT] = useState<boolean>(false);
  const [loadingRandomNFTSale, setLoadingRandomNFTSale] =
    useState<boolean>(false);
  const [loadingRandomCollection, setLoadingRandomCollection] =
    useState<boolean>(false);

  //hook
  const { readRandomSaleToken, readRandomToken } = useBackend();
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

  useEffect(() => {
    const fetchRandomNFT = async (): Promise<void> => {
      setLoadingRandomNFT(true);
      try {
        const randomToken = await readRandomToken();
        console.log(randomToken);
        setShowNft(randomToken);
        setLoadingRandomNFT(false);
      } catch (err) {
        console.log(err);
      }
      setLoadingRandomNFT(false);
    };
    fetchRandomNFT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchRandomCollection = async (): Promise<void> => {
      setLoadingRandomCollection(true);
      try {
        const allCollectionRes = await getRandomCollection();
        setShowCollection(allCollectionRes);
        setLoadingRandomCollection(false);
      } catch (error) {
        console.log(error);
      }
      setLoadingRandomCollection(false);
    };
    fetchRandomCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchRandomNFTSale = async (): Promise<void> => {
      setLoadingRandomNFTSale(true);
      try {
        const alltokenRes = await readRandomSaleToken();
        setShowSaleNFT(alltokenRes);
        setLoadingRandomNFTSale(false);
      } catch (error) {
        console.log(error);
      }
      setLoadingRandomNFTSale(false);
    };
    fetchRandomNFTSale();
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
          <div className={"row mt-3 justify-content-center"}>
            <div
              className={`flex flex-row p-2  flex-wrap border border-secondary-subtle rounded home_show_list ${
                showCollection.length === 4 && "justify-center "
              }`}
            >
              {loadingRandomCollection ? (
                <div className="flex justify-center w-full px-2 py-1 space-x-4">
                  {MockWait.map(() => (
                    <BlankCollectionCard />
                  ))}
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
          <div className={"row mt-3 justify-content-center"}>
            <div
              className={` d-flex flex-row p-2  flex-wrap border border-secondary-subtle rounded home_show_list ${
                showNft.length === 4 && "justify-center"
              }`}
            >
              {loadingRandomNFT ? (
                <div className="flex justify-center w-full animate-pulse">
                  {MockWait.map(() => (
                    <BlankNFTCard />
                  ))}
                </div>
              ) : (
                <>
                  {showNft.map((value: any) => (
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
          <div className={"row mt-3 mb-5 justify-content-center"}>
            <div
              className={`d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list ${
                showSaleNFT.length === 4 && "justify-center"
              }`}
            >
              {loadingRandomNFTSale ? (
                <div className="flex justify-center w-full animate-pulse">
                  {MockWait.map(() => (
                    <BlankNFTCard />
                  ))}
                </div>
              ) : (
                <>
                  {showSaleNFT.map((value: any) => (
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
      </div>
    </div>
  );
};
export default Home;
