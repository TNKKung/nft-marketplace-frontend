import React, { useCallback, useEffect, useRef, useState } from 'react'
import blankImage from "./blankImg.png"
import blankBgImage from "./blankBgImg.png"
import "./setting.css"
import useBackend from '../../hook/useBackend'
import { useUserAccount } from '../../store/UserAction/hook'
import { useNavigate } from "react-router-dom";
import useIPFS from '../../hook/useIPFS'

const SettingPage: React.FC = () => {

    const { readProfileAddress,
        editInfoProfile,
        editImageProfile,
        editImageBackground } = useBackend();
    const { address, changeImgProfile } = useUserAccount();
    const { getIPFS } = useIPFS();
    let navigate = useNavigate();

    const [profileInfoData, setProfileInfoData] = useState<any>();

    const profileImageInputRef = useRef<any>(null);
    const [profileImage, setProfileImage] = useState(undefined);
    const [previewProfileImage, setPreviewProfileImage] = useState(blankImage);
    const handleImageOnclick = () => {
        profileImageInputRef.current?.click();
    };
    const handleOnSelectFile = useCallback((e: any) => {
        const selectedFiles = e.target.files[0];
        setProfileImage(selectedFiles);
        try {
            setPreviewProfileImage(URL.createObjectURL(selectedFiles));

        } catch {
            if (profileInfoData.profileImage === "") {
                setPreviewProfileImage(blankImage);
            } else {
                setPreviewProfileImage(profileInfoData.profileImage);
            }
        }
    }, [profileInfoData]);

    const profileBgImageInputRef = useRef<any>(null);
    const [profileBgImage, setProfileBgImage] = useState(undefined);
    const [previewProfileBgImage, setPreviewProfileBgImage] = useState(blankBgImage);
    const handleBgImageOnclick = () => {
        profileBgImageInputRef.current?.click();
    };
    const handleOnSelectFileBg = useCallback((e: any) => {
        const selectedFiles = e.target.files[0];
        setProfileBgImage(selectedFiles);
        try {
            setPreviewProfileBgImage(URL.createObjectURL(selectedFiles));

        } catch {
            if (profileInfoData.backgroundImage === "") {
                setPreviewProfileBgImage(blankBgImage);
            } else {
                setPreviewProfileBgImage(profileInfoData.backgroundImage);
            }
        }
    }, [profileInfoData,]);


    const [profileName, setProfileName] = useState("");
    const [profileBio, setProfileBio] = useState("");
    const [profiletwitter, setProfileTwitter] = useState("");
    const [profileInstagram, setProfileInstagram] = useState("");
    const [profileContact, setProfileContact] = useState("");

    const handleProfileName = useCallback((e: any) => {
        setProfileName(e.target.value);
    }, []);
    const handleProfileBio = useCallback((e: any) => {
        setProfileBio(e.target.value);
    }, []);
    const handleProfileTwitter = useCallback((e: any) => {
        setProfileTwitter(e.target.value);
    }, []);
    const handleProfileInstagram = useCallback((e: any) => {
        setProfileInstagram(e.target.value);
    }, []);
    const handleProfileContact = useCallback((e: any) => {
        setProfileContact(e.target.value);
    }, []);

    const handleSaveProfileBtn = useCallback(async () => {
        var profileNameChecked = true;
        if (profileName === "") {
            profileNameChecked = false;
        }
        if (profileNameChecked === true) {
            editInfoProfile(profileName, profileBio, profiletwitter, profileInstagram, profileContact, address);
            console.log(profileImage);
            if (profileImage !== undefined) {
                console.log("editprofileImg");
                const CIDprofileImage = await getIPFS(profileImage);
                console.log(CIDprofileImage);
                if (CIDprofileImage !== false) {
                    editImageProfile(CIDprofileImage, address);
                    changeImgProfile(CIDprofileImage);
                }
            }
            if (profileBgImage !== undefined) {
                console.log("editprofileBgImg");
                const CIDprofileBgImage = await getIPFS(profileBgImage);
                console.log(CIDprofileBgImage);
                if (CIDprofileBgImage !== false) {
                    editImageBackground(CIDprofileBgImage, address);
                }
            }
            navigate("/profile/" + address);
        }

    }, [editInfoProfile,
        profileName,
        profileBio,
        profiletwitter,
        profileInstagram,
        profileContact,
        address,
        navigate,
        editImageBackground,
        editImageProfile,
        getIPFS,
        profileBgImage,
        profileImage,
        changeImgProfile
    ]);

    const fetchData = useCallback(async () => {
        if (address !== undefined) {
            const profileDataRes = await readProfileAddress(address);
            try {
                setProfileInfoData(profileDataRes);
                console.log(profileDataRes);
                setProfileName(profileDataRes.name);
                setProfileBio(profileDataRes.bio);
                if (profileDataRes.backgroundImage !== "") {
                    setPreviewProfileBgImage(profileDataRes.backgroundImage);
                }
                if (profileDataRes.profileImage !== "") {
                    setPreviewProfileImage(profileDataRes.profileImage);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate("/");
        }

    }, [address,
        readProfileAddress,
        navigate
    ]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0 position-relative">
                    <img src={previewProfileBgImage} alt="bgProfileImage" className="setting_bgProfileImg bg-gray-300"></img>
                    <div className="position-absolute setting_bgProfileImg setting_cursor_pointer
                    setting_bgProfileImg_click" onClick={handleBgImageOnclick}>
                        <div>Edit Background Image</div>
                    </div>
                    <input
                        type="file"
                        ref={profileBgImageInputRef}
                        accept="image/png, image/jpeg"
                        className={"d-none"}
                        onChange={handleOnSelectFileBg}
                    ></input>
                </div>
            </div>
            <div className="row">
                <div className="col-12 position-relative" style={{ top: "-100px" }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <img src={previewProfileImage}
                                    alt="profileImage"
                                    className="position-relative rounded-circle setting_profileImg"
                                ></img>
                                <div className="position-absolute rounded-circle setting_profileImg 
                                setting_cursor_pointer setting_profileImg_click"
                                    onClick={handleImageOnclick}>
                                    <div>Edit Profile Image</div>
                                    <div className="position-absolute setting_profileEditIcon">
                                        <i className="bi bi-brush-fill h3 bg-gray-50 p-3 rounded-circle"></i>
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    ref={profileImageInputRef}
                                    accept="image/png, image/jpeg"
                                    className={"d-none"}
                                    onChange={handleOnSelectFile}
                                ></input>
                            </div>
                        </div>
                        <div className="row mt-3 justify-content-center">
                            <div className="col-auto"><h4>Profile Setting</h4></div>
                        </div>
                        <div className="container-fluid mt-3">
                            <div className="row">
                                <div className="col-6">
                                    <div className="container-fluid">
                                        <div className='row justify-content-end'><div className="col-8"><h5>Profile</h5></div></div>
                                        <div className='row justify-content-end mb-3'>
                                            <div className="col-8">
                                                <label htmlFor="nameProfileInput" className="form-label">Name</label>
                                                <input className="form-control" placeholder="Name" value={profileName} onChange={handleProfileName} />
                                            </div>
                                        </div>
                                        <div className='row justify-content-end'>
                                            <div className="col-8">
                                                <label htmlFor="bioProfileInput" className="form-label">Bio</label>
                                                <textarea className="form-control" placeholder="Bio" value={profileBio} onChange={handleProfileBio} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="container-fluid">
                                        <div className='row'><h5>Social Links</h5></div>
                                        <div className='row'>
                                            <div className="col-8 mb-3">
                                                <label htmlFor="TwitterProfileInput" className="form-label">Twitter</label>
                                                <input className="form-control" placeholder="Twitter" value={profiletwitter} onChange={handleProfileTwitter} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-8 mb-3">
                                                <label htmlFor="InstagramProfileInput" className="form-label">Instagram</label>
                                                <input className="form-control" placeholder="Instagram" value={profileInstagram} onChange={handleProfileInstagram} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-8 mb-3">
                                                <label htmlFor="contactProfileInput" className="form-label">Contact</label>
                                                <input className="form-control" placeholder="Contact" value={profileContact} onChange={handleProfileContact} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 justify-content-center">
                            <div className="col-auto"><button className="btn btn-secondary" onClick={handleSaveProfileBtn}>Save Profile</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SettingPage;