import { useCallback, useEffect, useState } from "react";

import { CollectionObject } from "./type";

import Explore from "../Explore";
import CollectionBox from "../boxComponent/CollectionBox";

import useCollection from "../../hook/useCollection";
import BlankCollectionCard from "../BlankCard/BlankCollectionCard";

const ExploreCollection = () => {
  //const
  const displayShow = " ";
  const displayNone = " d-none";

  //State
  const [showCollection, setShowCollection] = useState<CollectionObject[]>([]);
  const [listCollection, setListCollection] = useState<CollectionObject[]>([]);
  const [filterNFT, setFilterNFT] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //className State

  //hook
  const { getAllCollection, getLengthCollection } = useCollection();

  //function
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const alltokenRes = await getAllCollection();
      setShowCollection(alltokenRes);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [getAllCollection]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchLengthCollection = async (): Promise<void> => {
      try {
        const lengthRes = await getLengthCollection();
        setListCollection(lengthRes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLengthCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Explore name="Collection" dropdown={false} setFilter={setFilterNFT}>
      <div className={"row mt-3 mb-5 justify-content-center"}>
        <div
          className={
            "d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list"
          }
        >
          {loading ? (
            <div className="grid grid-cols-4 gap-3.5 animate-pulse w-full justify-items-center">
              {listCollection.map(() => (
                <BlankCollectionCard />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3.5 w-full justify-items-center">
              {showCollection.map((value: any) => (
                <div key={value.collectionId}>
                  <CollectionBox
                    owner={value.owner}
                    description={value.description}
                    collectionId={value.collectionId}
                    collectionName={value.collectionName}
                    nftImage={value.nftImage}
                    ownerName={value.ownerName}
                    profileImage={value.profileImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Explore>
  );
};
export default ExploreCollection;
