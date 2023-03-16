import React, { useEffect, useState } from "react";
interface CreatorRoyaltyFeeProps {
  creatorList: any;
  setCreatorList: any;
  setTotal: any;
}
const CreatorRoyaltyFee: React.FC<CreatorRoyaltyFeeProps> = ({
  creatorList,
  setCreatorList,
  setTotal,
}) => {
  const [creatorObjectList, setCreateObjectList] = useState<any>([]);

  useEffect(() => {
    setCreateObjectList(creatorList);
  }, [creatorList]);

  const creatorAddresRender = (
    creatorWalletAddress: string,
    creatorEarn: number,
    index: number
  ) => {
    return (
      <div
        className="px-3 mb-2 bg-gray-100 rounded row align-items-center"
        key={index}
      >
        <div className="col-9 text-truncate">{creatorWalletAddress}</div>
        <div className="text-center col-2">{creatorEarn}%</div>
        <div className="col-1">
          <button
            className="btn btn-light"
            onClick={(e) => {
              removeCreatorAddress(creatorWalletAddress);
            }}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    );
  };

  const removeCreatorAddress = (creatorAddress: string) => {
    var newTotal = 0;
    const newCreatorList: any = creatorObjectList.filter(
      (item: any) => item.creatorAddress !== creatorAddress
    );
    for (const items of newCreatorList) {
      newTotal += items.creatorEarn;
    }
    setCreateObjectList(newCreatorList);
    setCreatorList(newCreatorList);
    setTotal(newTotal);
  };

  return (
    <div>
      {creatorObjectList &&
        creatorObjectList.map((item: any, index: number) => {
          return creatorAddresRender(
            item.creatorAddress,
            item.creatorEarn,
            index
          );
        })}
    </div>
  );
};
export default CreatorRoyaltyFee;
