import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DeleteCollection from "./DeleteCollection/DeleteCollection";
import AddCollection from "./AddCollection/AddCollection";

import CollectionBox from "../boxComponent/CollectionBox";

import useCollection from "../../hook/useCollection";
import { useUserAccount } from "../../store/UserAction/hook";

const MyCollection: React.FC = () => {
  const { getCollectionbyAddress } = useCollection();
  const { address } = useUserAccount();
  const navigate = useNavigate();

  const [searchCollection, setSearchCollection] = useState<string>("");
  const [createCollection, setCreateCollection] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState(false);
  const [selectDeleteCollection, setSelectDeleteCollection] = useState<any>({});

  const [collectionList, setCollectionList] = useState<any>([]);
  const [filtercollectionList, setFilterCollectionList] = useState<any>([]);

  const handleCreateCollection = useCallback(() => {
    if (createCollection === true) {
      setCreateCollection(false);
    } else {
      setCreateCollection(true);
    }
  }, [createCollection]);

  const handleDeleteCollection = useCallback(
    (CollectionId: string) => {
      setSelectDeleteCollection(CollectionId);

      if (deleteCollection === true) {
        setDeleteCollection(false);
      } else {
        setDeleteCollection(true);
      }
    },
    [deleteCollection]
  );

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchCollection(e.target.value);
      if (e.target.value === "") {
        setFilterCollectionList(collectionList);
      } else {
        const filterCollection = collectionList.filter(
          (collection: any, index: number) =>
            collection.collectionName.includes(e.target.value)
        );
        setFilterCollectionList(filterCollection);
      }
    },
    [collectionList]
  );

  const fetchData = useCallback(async () => {
    if (address !== undefined) {
      const collectionres = await getCollectionbyAddress(address);
      setCollectionList(collectionres);
      setFilterCollectionList(collectionres);
    } else {
      navigate("/");
    }
  }, [address, getCollectionbyAddress, navigate]);

  const createCollectNotice = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h4>My Collections</h4>
          </div>
        </div>
        <div className="row ms-2">
          <div className="col text-muted">
            Create, curate, and manage collections of unique NFTs to share and
            sell
          </div>
        </div>
        <div className="mt-3 row ms-2">
          <div className="col-auto">
            <div className="container p-4 border rounded shadow-sm">
              <div className="row justify-content-center">
                <div className="col-auto">
                  <h6>Create new Collection</h6>
                </div>
              </div>
              <div className="mt-1 row justify-content-center">
                <div className="col-16">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={handleCreateCollection}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 row">
          <div className="col-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control"
                placeholder="Search my collection"
                onChange={handleSearchInput}
                value={searchCollection}
              ></input>
            </div>
          </div>
        </div>
        <div className="flex-row flex-wrap mt-3 d-flex">
          {filtercollectionList.map((obj: any) => (
            <div className="m-2 position-relative" key={obj.collectionId}>
              <CollectionBox
                CollectionId={obj.collectionId}
                CollectionName={obj.collectionName}
                CollectionDescription={obj.description}
              ></CollectionBox>
              <div className="top-0 position-absolute end-0">
                <button
                  className="btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item text-end"
                      onClick={() => {
                        handleDeleteCollection(obj);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddCollection
        popupState={createCollection}
        setPopup={setCreateCollection}
        setCollectionList={createCollectNotice}
      ></AddCollection>
      <DeleteCollection
        popupState={deleteCollection}
        setPopup={setDeleteCollection}
        setCollectionList={createCollectNotice}
        collectionObject={selectDeleteCollection}
      ></DeleteCollection>
    </div>
  );
};
export default MyCollection;
