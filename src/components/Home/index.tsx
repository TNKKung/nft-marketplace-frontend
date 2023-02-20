import React, { useCallback, useEffect, useState } from 'react'
import useBackend from '../../hook/useBackend';
import useCollection from '../../hook/useCollection';
import NFTBox from '../boxComponent/NFTBox/NFTBox';
import "./home.css";
import { randomNumber } from '../../utils/randomHelper';
import CollectionBox from '../boxComponent/CollectionBox/CollectionBox';


const Home: React.FC = () => {

  //const
  const jCStart = " justify-content-start";
  const jCBetween = " justify-content-between";
  const displayShow = " ";
  const displayNone = " d-none";

  //state
  // const [nftItem, setNFTItem] = useState<any[]>([]);
  const [showNft, setShowNft] = useState<any[]>([]);
  const [showCollection, setShowCollection] = useState<any[]>([]);

  //className State
  const [NFTShowState, setNFTShowState] = useState(jCStart);
  const [collectionShowState, setCollectionShowState] = useState(jCStart);
  const [ExploreNFT, setExploreNFT] = useState(displayNone);
  const [ExploreCollection, setExploreCollection] = useState(displayNone);

  //hook
  const { readAllTokenId } = useBackend();
  const { getAllCollection } = useCollection();

  //utils function
  const getShowData = (dataRes: any[], maxShowNumber: number) => {
    const showIndexTokenID: number[] = randomNumber(dataRes.length, maxShowNumber);
    let showNFTRes = [];
    for (let i = 0; i < showIndexTokenID.length; i++) {
      showNFTRes.push(dataRes[showIndexTokenID[i]]);
    }
    return showNFTRes;
  }

  //fetchdata
  const fetchData = useCallback(async () => {
    const alltokenRes = await readAllTokenId();
    try {
      // setNFTItem(alltokenRes);
      if (alltokenRes.length > 0) {
        const showTokenList = getShowData(alltokenRes, 4);
        setShowNft(showTokenList);
        if(showTokenList.length === 4){
          setNFTShowState(jCBetween);
        }
        setExploreNFT(displayShow);
      }
    } catch (error) {
      console.log(error);
    }

    const allCollectionRes = await getAllCollection();
    try {
      if (allCollectionRes.length > 0) {
        const showCollectionList = getShowData(allCollectionRes, 8);
        setShowCollection(showCollectionList);
        if(showCollection.length === 8){
          setCollectionShowState(jCBetween);
        }
        setExploreCollection(displayShow);
      }
    } catch (error) {
      console.log(error);
    }

  }, [getAllCollection, readAllTokenId]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className="container mt-5">
        <div className="row mt-4 justify-content-between align-items-center">
          <h5 className="col-auto mb-0">Explore Collection</h5>
          <div className="col-auto">
            <button className="btn btn-outline-secondary">View all</button>
          </div>
        </div>
        <div className={"row mt-3 justify-content-center" + ExploreNFT}>
          <div className={"d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list" + collectionShowState}>
            {showCollection.map((value: any) =>
              <div className="m-2" key={value.collectionId}>
                <CollectionBox CollectionId={value.collectionId} ></CollectionBox>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-4 justify-content-between align-items-center">
          <h5 className="col-auto mb-0">Explore NFT</h5>
          <div className="col-auto">
            <button className="btn btn-outline-secondary">View all</button>
          </div>
        </div>
        <div className={"row mt-3 justify-content-center" + ExploreCollection}>
          <div className={"d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list" + NFTShowState}>
            {showNft.map((value: any) =>
              <div key={value.tokenId}>
                <NFTBox TokenID={value.tokenId} ></NFTBox>
              </div>
            )}
          </div>
        </div>

        {/* <div className="row py-3">
          <div className="col">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h5>NFT</h5>
                </div>
              </div>
              <div className="d-flex flex-row mt-3 flex-wrap">
                {nftItem.map((obj: any, index: number) => {
                  return <div key={index}>
                    <NFTBox TokenID={Number(obj.tokenId).toString()}></NFTBox>
                  </div>
                }
                )}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div >
  )
}
export default Home;