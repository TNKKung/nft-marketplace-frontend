import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useBackend from "../../hook/useBackend";
import "./search.css";
import CollectionBox from "../boxComponent/CollectionBox/CollectionBox";
import NFTBox from "../boxComponent/NFTBox/NFTBox";
import UserBox from "../boxComponent/UserBox/UserBox";

const Search: React.FC = () => {
    const params = useParams();
    const [loadingClass, setLoadingClass] = useState("");
    const [mainClass1, setMainClass1] = useState("d-none");
    const { getSearchValue } = useBackend();

    const [searchValue, setSearchValue] = useState<any[]>([
        { lists: [] },
        { lists: [] },
        { lists: [] }
    ]);

    const fechData = useCallback(async() => {
        const getSearchValueRes = await getSearchValue(params.searchValue);
        setSearchValue(getSearchValueRes);
        setLoadingClass("d-none");
        setMainClass1("");
    }, [
        getSearchValue,
        params
    ]);

    useEffect(() => {
        //first time running
        fechData();
        // eslint-disable-next-line
    }, [params])

    return (<div>
        <div className={"container-fluid mt-5 d-flex justify-content-center " + loadingClass}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        <div className={mainClass1}>
            <div className="container mt-5">
                <div className="row align-items-center pb-2 mb-2 border-bottom">
                    <h4 className="col-auto">Search results : </h4>
                    <h4 className="col-auto text-gray-500">{params.searchValue}</h4>
                </div>
                {searchValue[1].lists.length > 0 ?
                    <div>
                        <div className="row mt-4"><h5 className="col-auto">NFT results : {searchValue[1].lists.length}</h5></div>
                        <div className="row mt-1 justify-content-center">
                            <div className="d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded search_show_list">
                                {searchValue[1].lists.map((value: any) => 
                                    <div key={value.tokenId}>
                                        <NFTBox TokenID={value.tokenId} ></NFTBox>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> : null}


                {searchValue[0].lists.length > 0 ?
                    <div>
                        <div className="row mt-4"><h5 className="col-auto">User results : {searchValue[0].lists.length}</h5></div>
                        <div className="row mt-1 justify-content-center">
                            <div className="d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded search_show_list">
                                {searchValue[0].lists.map((value: any) => 
                                    <div className="m-2" key={value.address}>
                                        <UserBox userAddress={value.address}></UserBox>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> : null}


                {searchValue[2].lists.length > 0 ?
                    <div>
                        <div className="row mt-4"><h5 className="col-auto">Collection results : {searchValue[2].lists.length}</h5></div>
                        <div className="row mt-1 justify-content-center">
                            <div className="d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded search_show_list">
                                {searchValue[2].lists.map((value: any) => 
                                    <div className="m-2" key={value.collectionId}>
                                        <CollectionBox CollectionId={value.collectionId}></CollectionBox>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> : null}
                {searchValue[0].lists.length === 0 && searchValue[1].lists.length === 0 && searchValue[2].lists.length === 0 ?
                    <div>No result found</div>
                    : null}
            </div>
        </div>
    </div>)
}
export default Search;