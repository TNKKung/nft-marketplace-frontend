import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NFTBox from "../boxComponent/NFTBox/NFTBox";
import useCollection from "../../hook/useCollection";
import { useNavigate } from 'react-router-dom';
import DeleteCollection from "../MyCollection/DeleteCollection/DeleteCollection";
import { useUserAccount } from "../../store/UserAction/hook";

const Collection: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { getCollectionbyId } = useCollection();
    const { address } = useUserAccount();

    const [deleteCollection, setDeleteCollection] = useState(false);
    const handleDeleteCollection = useCallback(() => {
        if (deleteCollection === true) {
            setDeleteCollection(false);
        } else {
            setDeleteCollection(true);
        }
    }, [deleteCollection])

    const [loadingDataClass, setLoadingDataClass] = useState("placeholder");
    const [collectionObject, setCollectionObject] = useState<any>({});
    const [collectionName, setCollectionName] = useState("Collection Name");
    const [collectionOwner, setCollectionOwner] = useState("xxx");
    const [collectionDescription, setCollectionDescription] = useState("Description");
    const [collectionListNFT, setCollectionListNFT] = useState<any>([]);


    const fetchData = useCallback(async () => {
        if (params.collectionId !== undefined) {
            const collectionDescriptRes = await getCollectionbyId(params.collectionId);
            console.log(collectionDescriptRes);
            try {
                setCollectionObject(collectionDescriptRes);
                setCollectionName(collectionDescriptRes.collectionName);
                setCollectionOwner(collectionDescriptRes.owner);
                setCollectionDescription(collectionDescriptRes.description);
                setCollectionListNFT(collectionDescriptRes.listNFT);
                setLoadingDataClass("");

            } catch (error) {
                navigate('/', { replace: true });
            }
        } else {
            navigate('/', { replace: true });
        }

    }, [params.collectionId,
        navigate,
        getCollectionbyId
    ]);

    const backToMyCollection = useCallback(() => {
        navigate('/myCollection', { replace: true });
    }, [navigate])

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-fluid">
            <div className="row bg-gray-50 py-5">
                <div className="col">
                    <div className="container">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-auto"><h4 className={"m-0 " + loadingDataClass}>{collectionName}</h4></div>
                            <div className="col-auto">
                                <div className="d-flex flex-row">
                                    <button className="btn btn-secondary mx-1"><i className="bi bi-share-fill"></i> Copy link</button>
                                    {collectionOwner !== address ? null :(<div>
                                    <button className="btn btn-secondary mx-1" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots"></i></button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button className="dropdown-item text-end">
                                                Add created NFT
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item text-end">
                                                Edit
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item text-end" onClick={handleDeleteCollection}>
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                        <div className="row"><div className={"col-auto " + loadingDataClass}>Owned by <span>{collectionOwner}</span></div></div>
                        <div className="row mt-2 ps-2"><div className={"col-auto text-muted " + loadingDataClass}>{collectionDescription}</div></div>
                    </div>
                </div>
            </div>
            <div className="row py-3">
                <div className="col">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                                    <input className="form-control" placeholder="Search"></input>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row mt-3 flex-wrap">
                            {collectionListNFT.map((obj: any, index: number) =>
                                <NFTBox TokenID={obj.toString()}></NFTBox>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <DeleteCollection popupState={deleteCollection} setPopup={setDeleteCollection} setCollectionList={backToMyCollection} collectionObject={collectionObject}></DeleteCollection>

        </div>
    )
}
export default Collection