import { useCallback, useEffect, useState } from "react";

import { CategoryObject, ExploreNFTProps, NFTObject } from "./type";

import Explore from "../Explore";
import NFTBox from "../boxComponent/NFTBox";

import useBackend from "../../hook/useBackend";

const ExploreNFT: React.FC<ExploreNFTProps> = ({ isSaleList }) => {
  //const
  const displayShow = " ";
  const displayNone = " d-none";

  //State
  const [NFTList, setNFTList] = useState<NFTObject[]>([]);
  const [showNft, setShowNft] = useState<NFTObject[]>([]);
  const [filterNFT, setFilterNFT] = useState<string>("");

  //className State
  const [ExploreNFT, setExploreNFT] = useState<string>(displayNone);

  //hook
  const { readAllTokenId, readAllSaleTokenId } = useBackend();

  //function
  const fetchData = useCallback(async () => {
    let alltokenRes;
    if (isSaleList) {
      alltokenRes = await readAllSaleTokenId();
    } else {
      alltokenRes = await readAllTokenId();
    }
    try {
      if (alltokenRes.length > 0) {
        console.log(alltokenRes);
        setShowNft(alltokenRes);
        setNFTList(alltokenRes);
        setExploreNFT(displayShow);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isSaleList, readAllSaleTokenId, readAllTokenId]);

  const getfilter = useCallback(() => {
    const getNFTFilter = NFTList.filter((NFT: NFTObject) => {
      return NFT.category.some((category: CategoryObject) => {
        return category.label === filterNFT;
      });
    });
    console.log(getNFTFilter);
    setShowNft(getNFTFilter);
  }, [filterNFT, NFTList]);

  useEffect(() => {
    if (filterNFT !== "") {
      getfilter();
    } else {
      setShowNft(NFTList);
    }
    // eslint-disable-next-line
  }, [filterNFT]);

  useEffect(() => {
    if (showNft.length > 0) {
      setExploreNFT(displayShow);
    } else {
      setExploreNFT(displayNone);
    }
  }, [showNft]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Explore name="NFT" dropdown={true} setFilter={setFilterNFT}>
      <div className={"row mt-3 mb-5 justify-content-center" + ExploreNFT}>
        <div
          className={
            "d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list"
          }
        >
          {isSaleList ? (
            <>
              {showNft.map((value: NFTObject) => (
                <>
                  {value.statusSale && (
                    <div key={value.tokenId}>
                      <NFTBox TokenID={value.tokenId}></NFTBox>
                    </div>
                  )}
                </>
              ))}
            </>
          ) : (
            <>
              {showNft.map((value: NFTObject) => (
                <div key={value.tokenId}>
                  <NFTBox TokenID={value.tokenId}></NFTBox>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Explore>
  );
};
export default ExploreNFT;
