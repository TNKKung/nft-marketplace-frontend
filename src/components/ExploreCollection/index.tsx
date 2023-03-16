import { useCallback, useEffect, useState } from "react";

import { CollectionObject } from "./type";

import Explore from "../Explore";
import CollectionBox from "../boxComponent/CollectionBox";

import useCollection from "../../hook/useCollection";

const ExploreCollection = () => {
  //const
  const displayShow = " ";
  const displayNone = " d-none";

  //State
  const [showCollection, setShowCollection] = useState<CollectionObject[]>([]);
  const [filterNFT, setFilterNFT] = useState<string>("");

  //className State
  const [ExploreCollection, setExplore] = useState<string>(displayNone);

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

  useEffect(() => {
    if (showCollection.length > 0) {
      setExplore(displayShow);
    } else {
      setExplore(displayNone);
    }
  }, [showCollection, filterNFT]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Explore name="Collection" dropdown={false} setFilter={setFilterNFT}>
      <div
        className={"row mt-3 mb-5 justify-content-center" + ExploreCollection}
      >
        <div
          className={
            "d-flex flex-row p-2 flex-wrap border border-secondary-subtle rounded home_show_list"
          }
        >
          {showCollection.length !== 0 ? (
            <>
              {showCollection.map((value: any) => (
                <div className="m-2" key={value.collectionId}>
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
            </>
          ) : (
            <div
              className={"container-fluid py-24 d-flex justify-content-center "}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Explore>
  );
};
export default ExploreCollection;
