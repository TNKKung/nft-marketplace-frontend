import { useCallback, useEffect, useState } from "react";
import useCollection from "../../hook/useCollection";
import CollectionBox from "../boxComponent/CollectionBox/CollectionBox";
import Explore from "../Explore";


const ExploreCollection = () => {

    //const
    const displayShow = " ";
    const displayNone = " d-none";

    //State
    const [showCollection, setShowCollection] = useState<any[]>([]);
    const [filterNFT, setFilterNFT] = useState("");

    //className State
    const [ExploreCollection, setExplore] = useState(displayNone);

    //hook
    const { getAllCollection } = useCollection();

    //function
    const fetchData = useCallback(async () => {
        const alltokenRes = await getAllCollection();
        try {
            if (alltokenRes.length > 0) {
                setShowCollection(alltokenRes);
                setExplore(displayShow);
            }
        } catch (error) {
            console.log(error);
        }
    }, [getAllCollection]);
    

    useEffect(()=>{
        if(showCollection.length > 0){
            setExplore(displayShow);
            console.log(filterNFT);
        }else{
            setExplore(displayNone);
        }
    },[showCollection]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])


    return (
        <Explore name="Collection" dropdown={false} setFilter={setFilterNFT}>
            <div className={"row mt-3 mb-5 justify-content-center" + ExploreCollection}>
                <div className={"d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list"}>
                    {showCollection.map((value: any) =>
                        <div className="m-2" key={value.tokenId}>
                            <CollectionBox CollectionId={value.collectionId} ></CollectionBox>
                        </div>
                    )}
                </div>
            </div>
        </Explore>

    )
}
export default ExploreCollection;
