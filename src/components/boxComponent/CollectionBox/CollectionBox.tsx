import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBackend from "../../../hook/useBackend";
import useCollection from "../../../hook/useCollection";
import "./CollectionBox.css";
import blankImg from "./blankImg.png";
import blankBgImg from "./blankBgImg.png";

interface CollectionProps {
  CollectionId: string;
  CollectionName?: string;
  CollectionDescription?: string;
}
const CollectionBox = (props: CollectionProps) => {
  const { getCollectionbyId } = useCollection();
  const { readProfileAddress, readTokenIdData } = useBackend();
  const [placeHolder, setPlaceHolder] = useState(" placeholder");
  const [collectionData, setCollectionData] = useState<any>({
    collectionName: "collectionName",
    description: "-",
    listNFT: [],
  });

  const [profileImage, setProfileImage] = useState(blankImg);
  const [bgImage, setBgImage] = useState(blankBgImg);
  const [profileName, setProfileName] = useState("Name");
  const fetchData = useCallback(async () => {
    try {
      const collectionRes = await getCollectionbyId(props.CollectionId);
      // console.log(collectionRes);
      setCollectionData(collectionRes);
      const listNft = collectionRes.listNFT.length;
      if (listNft > 0) {
        const indexNFT = await Math.floor(Math.random() * listNft);
        const tokenIDData = await readTokenIdData(
          collectionRes.listNFT[indexNFT].toString()
        );
        setBgImage(tokenIDData.tokenURI);
      }
      const UserDataRes = await readProfileAddress(collectionRes.owner);
      setProfileName(UserDataRes.name);
      if (UserDataRes.profileImage !== "") {
        setProfileImage(UserDataRes.profileImage);
      }
      setPlaceHolder("");
    } catch (error) {
      console.log(error);
    }
  }, [getCollectionbyId, props, readProfileAddress, readTokenIdData]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="border rounded shadow-sm UserBox_box d-flex flex-column align-items-center">
        <div className="border rounded shadow-sm container-fluid">
          <div className="row">
            <div className="p-0 col-12 placeholder-glow">
              <img
                src={bgImage}
                alt="bgProfileImage"
                className={"collectionBox_bgImg bg-gray-300" + placeHolder}
              ></img>
            </div>
          </div>
          {/* <div className="row position-absolute" style={{ top: "40px" }}>
                        <div className="col-12">
                            <img src={profileImage} alt="profileImage" className={"bg-gray-800 rounded-circle collectionBox_profile"}></img>
                        </div>
                    </div> */}
          <div className="px-2 my-1 mt-2 row justify-content-end placeholder-glow">
            <h6
              className={
                "col-6 p-0 m-0 text-break text-truncate text-end" + placeHolder
              }
            >
              {collectionData.collectionName}
            </h6>
          </div>
          <div className="px-2 mb-2 row justify-content-end placeholder-glow align-items-center">
            <div className={"col-auto p-0 me-2" + placeHolder}>
              {profileName}
            </div>
            <div className="col-auto p-0">
              <img
                src={profileImage}
                alt="profileImage"
                className={
                  "collectionBox_profile p-0 bg-gray-800 " + placeHolder
                }
              ></img>
            </div>
          </div>
        </div>
        <Link
          className="top-0 position-absolute w-100 h-100"
          to={"/collection/" + props.CollectionId}
        ></Link>
      </div>
    </div>
  );
};
export default CollectionBox;
