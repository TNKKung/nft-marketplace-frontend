import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./UserBox.css";
import { ProfileDataObject, userProps } from "./type";

import useBackend from "../../../hook/useBackend";
import { shortenAddress } from "../../../utils/addressHelper";

const UserBox: React.FC<userProps> = ({ userAddress }) => {
  const { readProfileAddress } = useBackend();

  const [profileImage, setProfileImage] = useState<string>(
    "/images/blank/blankImg.png"
  );
  const [profileBgImg, setProfileBgImg] = useState<string>(
    "/images/blank/blankBgImg.png"
  );
  const [placeHolder, setPlaceHolder] = useState<string>(" placeholder");

  const [profileData, setProfileData] = useState<ProfileDataObject>({
    name: "Name",
    address: "0x0000000000000000000000000000000000000000",
  });

  const fetchData = useCallback(async () => {
    try {
      const profileRes = await readProfileAddress(userAddress);

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
  }, [readProfileAddress, userAddress]);

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
                src={profileBgImg}
                alt="bgProfileImage"
                className={"UserBox_bgProfileImg bg-gray-300" + placeHolder}
              ></img>
            </div>
          </div>
          <div className="row position-absolute" style={{ top: "25px" }}>
            <div className="col-12">
              <img
                src={profileImage}
                alt="profileImage"
                className={"bg-gray-800 rounded-circle UserBox_profile"}
              ></img>
            </div>
          </div>
          <div className="px-2 my-1 row justify-content-end placeholder-glow">
            <h6
              className={
                "col-6 m-0 text-break text-truncate text-end" + placeHolder
              }
            >
              {profileData.name}
            </h6>
          </div>
          <div className="px-2 my-1 row justify-content-end placeholder-glow">
            <div className={"col-auto" + placeHolder}>
              {shortenAddress(profileData.address)}
            </div>
          </div>
        </div>
        <Link
          className="top-0 position-absolute w-100 h-100"
          to={"/Profile/" + userAddress}
        ></Link>
      </div>
    </div>
  );
};
export default UserBox;
