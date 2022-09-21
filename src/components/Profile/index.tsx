import React from 'react'
import blankImage from "./blankImg.png"
const Profile: React.FC = () => {

  return (
    <div className="container-fluid">
      <div className="row position-relative">
        <div className="col-12 bg-gray-300" style={{ height: "300px" }}>
        </div>
      </div>
      <div className="row position-relative">
        <div className="col-12 position-absolute" style={{ top: "-100%" }}>
          <img src={blankImage} alt="profileImage" className="bg-gray-800 rounded-circle"></img>
        </div>
      </div>
    </div>
  )
}
export default Profile;