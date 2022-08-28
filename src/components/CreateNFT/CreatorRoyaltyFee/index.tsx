import React, { useEffect, useState } from 'react'
interface CreatorRoyaltyFeeProps {
    creatorList: any
    setCreatorList: any
}
function CreatorRoyaltyFee(props: CreatorRoyaltyFeeProps) {
    const [creatorObjectList, setCreateObjectList] = useState([]);
    useEffect(()=>{
        setCreateObjectList(props.creatorList);
    },[props.creatorList])
    const creatorAddresRender = (creatorWalletAddress: string, creatorEarn: number, index: number) => {
        return (
            <div className='row mb-2 align-items-center bg-gray-100 rounded' key={index}>
                <div className='col-9 text-truncate'>{creatorWalletAddress}</div>
                <div className='col-2 text-center'>{creatorEarn} %</div>
                <div className='col-1'><button className='btn btn-light'
                onClick={e=>{removeCreatorAddress(creatorWalletAddress)}} ><i className="bi bi-trash-fill"></i></button></div>
            </div>
        )
    }

    const removeCreatorAddress = (creatorAddress:string) =>{
        const newCreatorList = creatorObjectList.filter((item:any)=> item.creatorAddress !== creatorAddress);
        setCreateObjectList(newCreatorList);
        props.setCreatorList(newCreatorList);
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