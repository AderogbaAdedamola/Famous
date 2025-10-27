import React from "react"
import "./styles/SingleUserProfile.css"
import arrowBack from "../assets/arrow-back.svg"
import placeholder from "../assets/profile-placeholder.png"
import SingleUserProfileSkeleton from "./SingleUserProfileSkeleton"

const SingleUserProfile = ({ SingleUserData, setShowMainPage, setShowViewProfile, isUser, setIsUser }) => {
  
  function arrowBackAction() {
    setShowMainPage(true);
    setShowViewProfile(false);
    setIsUser(false)
  }

   if (!SingleUserData) {
    return (
        <div className="main-container">
            <header className="view-profile-header">
                <span className="arrow-back-container" onClick={arrowBackAction}>
                <img src={arrowBack} alt="back" />
                </span>
                <span>User Name</span>
            </header>
            <SingleUserProfileSkeleton />
        </div>)
   }


  return (
    <div className="main-container">
    <header className="view-profile-header">
        <span className="arrow-back-container" onClick={arrowBackAction}>
          <img src={arrowBack} alt="back" />
        </span>
        <span>{SingleUserData.name}</span>
      </header>

      <div className="single-user-profile-container">
        <div className="profile-header">
          <div className="profile-banner"></div>
          <div className="profile-info">
            <img
              src={SingleUserData.image || placeholder}
              alt={SingleUserData.name}
              className="profile-avatar"
            />
            <div className="profile-details">
              <h2 className="profile-name">{SingleUserData.name}</h2>
              <span className="profile-role">{SingleUserData.role || "User"}</span>
              <p className="profile-email">{"aderogbaadedamola8@gmail.com"}</p>
            </div>
            {isUser &&
            <button 
                className="edit-btn"
                // onClick={editProfile}
            >
              ✏️ Edit Profile
            </button>}
          </div>
        </div>

        <div className="profile-body">
          <h3>About Me</h3>
          <p className="profile-bio">
            {SingleUserData.bio ||
              "This user has not added any information about themselves yet."}
          </p>
        </div>
      </div> 
    </div>
  )
}

export default SingleUserProfile;
