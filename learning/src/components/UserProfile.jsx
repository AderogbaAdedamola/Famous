import { useState } from "react";
import profilePlaceholder from "../assets/profile-placeholder.png"

export default function UserProfile(props){
    const [userName, setUserName] = useState(props.userName || "User Name")
    const [userNameExceed, setUserNameExceed] = useState(false)
    const [userRole, setUserRole] = useState(props.userRole || "user role will be displayed here.")
    const [userRoleExceed, setUserRoleExceed] = useState(false)
   
    if(userName && userName.trim().length > 13){
       setUserNameExceed(true)
        setUserName((prev)=>  prev.slice(0, 13))
    }
     if(userRole && userRole.trim().length > 22){
       setUserRoleExceed(true)
        setUserRole((prev)=>  prev.slice(0, 22))
        
     }
    return(
        <div className="profile-container" onClick={props.onClick}>
            <div className="image-container">
                <img src={props.image || profilePlaceholder} alt="profile picture" />
            </div>
            <div className="userInfo-container">
                <h2 className="user-name" >{userName}{userNameExceed && <span>...</span>}</h2>
                <h3 className="user-role">{userRole}{userRoleExceed && <span>...</span>}</h3>
                <p className="short-bio">{props.userBio || " Bio will be displayed here."}</p>
            </div>
        </div>
    )
}
