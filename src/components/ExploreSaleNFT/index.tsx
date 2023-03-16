import { useCallback, useEffect, useState } from "react";

import Explore from "../Explore";
import NFTBox from "../boxComponent/NFTBox";

import useBackend from "../../hook/useBackend";

const ExploreSaleNFT = () => {
  //const
  const displayShow = " ";
  const displayNone = " d-none";

  //State
  const [NFTList, setNFTList] = useState<any[]>([]);
  const [showNft, setShowNft] = useState<any[]>([]);
  const [filterNFT, setFilterNFT] = useState("");

  //className State
  const [ExploreNFT, setExploreNFT] = useState(displayNone);

  //hook
  const { readAllTokenId } = useBackend();

  //function
  const fetchData = useCallback(async () => {
    const alltokenRes = await readAllTokenId();
    const saleToken = alltokenRes.filter((tokenData: any) => {
      return tokenData.statusSale === true;
    });
    try {
      if (saleToken.length > 0) {
        setShowNft(saleToken);
        setNFTList(saleToken);
        setExploreNFT(displayShow);
      }
    } catch (error) {
      console.log(error);
    }
  }, [readAllTokenId]);

  const getfilter = useCallback(() => {
    const getNFTFilter = NFTList.filter((NFT: any) => {
      return NFT.category.some((category: any) => {
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
    <Explore name="trading NFT" dropdown={true} setFilter={setFilterNFT}>
      <div className={"row mt-3 mb-5 justify-content-center" + ExploreNFT}>
        <div
          className={
            "d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list"
          }
        >
          {showNft.map((value: any) => (
            <div key={value.tokenId}>
              <NFTBox TokenID={value.tokenId}></NFTBox>
            </div>
          ))}
        </div>
      </div>
    </Explore>
  );
};
export default ExploreSaleNFT;
