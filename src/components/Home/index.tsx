import React, { useCallback, useEffect, useState } from 'react'
import useContracts from '../../hook/useContracts';
import NFTBox from '../boxComponent/NFTBox/NFTBox';


const Home: React.FC = () => {
  const { getNFTforSaleList } = useContracts();

  const [saleNFTItem, setSaleNFTItem] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    const saleNFTList = await getNFTforSaleList();
    const filterNFT = saleNFTList.filter((saleNFTList: any) => { return saleNFTList.sold === false });
    try {
      console.log(filterNFT);
      setSaleNFTItem(filterNFT);
    } catch (error) {
      console.log(error);
    }
  }, [getNFTforSaleList]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className="container mt-5">
        <div className="row py-3">
          <div className="col">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h5>NFT for sale</h5>
                </div>
              </div>
              <div className="d-flex flex-row mt-3 flex-wrap">
                {saleNFTItem.map((obj: any, index: number) => {
                  return <div key={index}>
                    <NFTBox TokenID={Number(obj.tokenId).toString()}></NFTBox>
                  </div>
                }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;