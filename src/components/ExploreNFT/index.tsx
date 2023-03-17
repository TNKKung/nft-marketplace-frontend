import { useCallback, useEffect, useState } from "react";

import { CategoryObject, ExploreNFTProps, NFTObject } from "./type";

import Explore from "../Explore";
import NFTBox from "../boxComponent/NFTBox";

import useBackend from "../../hook/useBackend";
import BlankNFTCard from "../BlankCard/BlankNFTCard";

const ExploreNFT: React.FC<ExploreNFTProps> = ({ isSaleList }) => {
  //const
  const displayShow = " ";
  const displayNone = " d-none";

  //State
  const [NFTList, setNFTList] = useState<NFTObject[]>([]);
  const [showNft, setShowNft] = useState<NFTObject[]>([]);
  const [infoList, setInfoList] = useState<NFTObject[]>([]);
  const [filterNFT, setFilterNFT] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //className State
  const [ExploreNFT, setExploreNFT] = useState<string>(displayNone);

  //hook
  const {
    readAllTokenId,
    readAllSaleTokenId,
    readAllInfoTokenId,
    readInfoSaleTokenId,
  } = useBackend();

  //function
  const fetchData = useCallback(async () => {
    try {
      let alltokenRes;
      if (isSaleList) {
        alltokenRes = await readAllSaleTokenId();
      } else {
        alltokenRes = await readAllTokenId();
      }
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
    const fetchInfoToken = async (): Promise<void> => {
      setLoading(true);
      try {
        if (isSaleList) {
          const responseInfo = await readInfoSaleTokenId();
          setInfoList(responseInfo);
        } else {
          const responseInfo = await readAllInfoTokenId();
          setInfoList(responseInfo);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchInfoToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {loading ? (
                <div className="grid grid-cols-4 gap-3.5 animate-pulse">
                  {showNft.map(() => (
                    <BlankNFTCard />
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ">
                  {infoList.map((value: any) => (
                    <div key={value.tokenId}>
                      <NFTBox
                        tokenId={value.tokenId}
                        URLImage={value.tokenURI}
                        collection={""}
                        NFTname={value.nameNFT}
                        saleNFTStatus={value.statusSale}
                        price={value.price}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <div className="grid grid-cols-4 gap-3.5 animate-pulse">
                  {showNft.map(() => (
                    <BlankNFTCard />
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ">
                  {infoList.map((value: any) => (
                    <div key={value.tokenId}>
                      <NFTBox
                        tokenId={value.tokenId}
                        URLImage={value.tokenURI}
                        collection={""}
                        NFTname={value.nameNFT}
                        saleNFTStatus={value.statusSale}
                        price={value.price}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Explore>
  );
};
export default ExploreNFT;
