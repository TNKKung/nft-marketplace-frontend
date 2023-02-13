import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBackend from "../../../hook/useBackend";
import useCollection from "../../../hook/useCollection";
import "./CollectionBox.css"
import blankImg from "./blankImg.png"

interface CollectionProps {
    CollectionId: string;
    CollectionName?: string;
    CollectionDescription?: string;
}
const CollectionBox = (props: CollectionProps) => {
    const { getCollectionbyId } = useCollection();
    const { readProfileAddress } = useBackend();
    const [collectionData, setCollectionData] = useState<any>({
        collectionName: "collectionName",
        description: "-",
        listNFT:[]
    });
    const [profileImage, setProfileImage] = useState(blankImg);
    const fetchData = useCallback(async () => {
        try {
            const collectionRes = await getCollectionbyId(props.CollectionId);
            console.log(collectionRes);
            setCollectionData(collectionRes);
            const UserDataRes = await readProfileAddress(collectionRes.owner);
            if (UserDataRes.profileImage !== "") {
                setProfileImage(UserDataRes.profileImage);
            }
        } catch (error) {
            console.log(error);
        }
    }, [
        getCollectionbyId,
        props,
        readProfileAddress
    ])

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <div className="collectionBox_box d-flex flex-column align-items-center border rounded p-4 shadow-sm">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-auto">
                            <img className="collectionBox_profile" src={profileImage} alt="profilePicture" />
                        </div>
                        <div className="col-auto p-0">
                            <div className="container-fluid">
                                <div className="row">
                                    <h6 className="w-100 text-center text-break text-truncate">{collectionData.collectionName}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-100 text-center mt-3 pt-2 border-top">Total items <span className="h6">{collectionData.listNFT.length}</span></div>

                <Link className="position-absolute top-0 w-100 h-100" to={"/collection/" + props.CollectionId}></Link>

            </div>
        </div>
    )
}
export default CollectionBox;