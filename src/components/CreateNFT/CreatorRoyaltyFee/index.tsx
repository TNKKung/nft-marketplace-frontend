import React, { useEffect, useState } from 'react'
interface CreatorRoyaltyFeeProps {
    creatorList: any
    setCreatorList: any
    setTotal: any
}
function CreatorRoyaltyFee(props: CreatorRoyaltyFeeProps) {
    const [creatorObjectList, setCreateObjectList] = useState([]);
    useEffect(()=>{
        setCreateObjectList(props.creatorList);
    },[props.creatorList])
    const creatorAddresRender = (creatorWalletAddress: string, creatorEarn: number, index: number) => {
        return (
            <div className='row mb-2 align-items-center bg-gray-100 rounded'>
                <div className='col-9 text-truncate'>{creatorWalletAddress}</div>
                <div className='col-2 text-center'>{creatorEarn} %</div>
                <div className='col-1'><button className='btn btn-light'
                onClick={e=>{removeCreatorAddress(creatorWalletAddress)}} ><i className="bi bi-trash-fill"></i></button></div>
            </div>
        )
    }

    const removeCreatorAddress = (creatorAddress:string) =>{
        var newTotal = 0;
        const newCreatorList:any = creatorObjectList.filter((item:any)=> item.creatorAddress !== creatorAddress);
        for (const items of newCreatorList){
            newTotal += items.creatorEarn;
        }
        setCreateObjectList(newCreatorList);
        props.setCreatorList(newCreatorList);
        props.setTotal(newTotal);
    }

    return (
        <div>
            {creatorObjectList.map((item: any, index: number) => {
                return creatorAddresRender(item.creatorAddress, item.creatorEarn, index)
            })}
        </div>
    )
}
export default CreatorRoyaltyFee;