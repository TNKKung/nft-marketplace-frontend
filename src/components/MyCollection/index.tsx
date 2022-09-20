import React, { useState, useCallback, useEffect } from 'react'
import useCollection from '../../hook/useCollection';
import { useUserAccount } from '../../store/UserAction/hook';
import AddCollection from './AddCollection/AddCollection';
import CollectionBox from './CollectionBox/CollectionBox';

const MyCollection: React.FC = () => {
    const { getCollectionbyAddress } = useCollection();
    const { address } = useUserAccount();
    const [createCollection, setCreateCollection] = useState(false);

    const [collectionList, setCollectionList] = useState<any>([]);

   
    const handleCreateCollection = useCallback(() => {
        if (createCollection === true) {
            setCreateCollection(false);
        } else {
            setCreateCollection(true);
        }
    }, [createCollection]);

    const fetchData = useCallback(async () => {
        const collectionres = await getCollectionbyAddress(address);
        console.log(collectionres);
        setCollectionList(collectionres);
    }, [address, getCollectionbyAddress])

    const createCollectNotice = useCallback(()=>{
        fetchData();
    },[fetchData]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <div className="container mt-5">
                <div className="row"><div className="col"><h4>My Collections</h4></div></div>
                <div className="row ms-2"><div className="col text-muted">Create, curate, and manage collections of unique NFTs to share and sell</div></div>
                <div className="row mt-3 ms-2"><div className="col-auto">
                    <div className="container border rounded p-4 shadow-sm">
                        <div className="row justify-content-center"><div className="col-auto"><h6>Create new Collection</h6></div></div>
                        <div className="row justify-content-center mt-1"><div className="col-16">
                            <button className="btn btn-secondary w-100" onClick={handleCreateCollection}>Create</button>
                        </div></div>
                    </div>
                </div></div>
                <div className="row mt-5"><div className="col-4">
                    <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                        <input className="form-control" placeholder="Search my collection"></input>
                    </div>
                </div></div>
                <div className="d-flex flex-row mt-3 flex-wrap">
                    {collectionList.map((obj: any, index: number) =>
                        <CollectionBox CollectionName={obj.collectionName} CollectionDescription={obj.description} key={index}></CollectionBox>
                    )}
                </div>
            </div>
            <AddCollection popupState={createCollection} setPopup={setCreateCollection} setCollectionList={createCollectNotice}></AddCollection>
        </div>
    )
}
export default MyCollection;