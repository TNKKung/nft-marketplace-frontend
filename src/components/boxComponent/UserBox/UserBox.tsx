import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBackend from "../../../hook/useBackend";
import "./UserBox.css"
import blankImg from "./blankImg.png"
import blankBgImg from "./blankBgImg.png"
import { shortenAddress } from "../../../utils/addressHelper";

interface userProps {
    userAddress: string;

}
const UserBox = (props: userProps) => {
    const { readProfileAddress } = useBackend();
    const [profileImage, setProfileImage] = useState(blankImg);
    const [profileBgImg, setProfileBgImg] = useState(blankBgImg);
    const [placeHolder, setPlaceHolder] = useState(" placeholder");

    const [profileData, setProfileData] = useState<any>({
        name: "Name",
        address: "0x0000000000000000000000000000000000000000",
    });
    const fetchData = useCallback(async () => {
        try {
            const profileRes = await readProfileAddress(props.userAddress);
            
            if (profileRes.profileImage !== "") {
                setProfileImage(profileRes.profileImage);
            }
            if (profileRes.backgroundImage !== "") {
                setProfileBgImg(profileRes.backgroundImage);
            }
            setProfileData(profileRes);
            setPlaceHolder("");
        } catch (error) {
            console.log(error);
        }
    }, [
        props,
        readProfileAddress
    ])

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <div className="UserBox_box d-flex flex-column align-items-center border rounded shadow-sm">
                <div className="container-fluid border rounded shadow-sm">
                    <div className="row">
                        <div className="col-12 p-0 placeholder-glow">
                            <img src={profileBgImg} alt="bgProfileImage" className={"UserBox_bgProfileImg bg-gray-300"+placeHolder}></img>
                        </div>
                    </div>
                    <div className="row position-absolute" style={{ top: "25px" }}>
                        <div className="col-12">
                            <img src={profileImage} alt="profileImage" className={"bg-gray-800 rounded-circle UserBox_profile"}></img>
                        </div>
                    </div>
                    <div className="row my-1 px-2 justify-content-end placeholder-glow">
                        <h6 className={"col-6 m-0 text-break text-truncate text-end"+placeHolder}>{profileData.name}</h6>
                    </div>
                    <div className="row my-1 px-2 justify-content-end placeholder-glow">
                        <div className={"col-auto"+placeHolder}>{shortenAddress(profileData.address)}</div>
                    </div>
                </div>
                <Link className="position-absolute top-0 w-100 h-100" to={"/Profile/" + props.userAddress}></Link>
            </div>
        </div >
    )
}
export default UserBox;