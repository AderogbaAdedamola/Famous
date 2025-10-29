import add from "../assets/add-dark.svg"
import edit from "../assets/edit.png"
import deleteLogo from "../assets/delete.png"
import search from "../assets/search-dark.svg"
import close from "../assets/close-dark.svg"
import { useEffect, useRef, useState } from "react"
import AlartBox from "./AlartBox"
import { deleteUserProfile } from "../deleteUserProfile"
import { deleteAllOtherProfiles } from "../deleteAll"
import SuggestionBox from "./SuggestionBox"


export default function SideNav(props){
    const [isSearch, setIsSearch] = useState(false)
    const [showAlart, setShowAlart] = useState(false)
    const [query, setQuery] = useState("");

    function searchUser(){
        event.preventDefault()
    }
  
    function closeNav(){
        props.setShowSideNav(false)
    
    }
    function displayProfileSettings(){
        props.setShowSideNav(false)
        props.setShowMainPage(false)
        props.setShowProfileSettings(true)
    }
    function deleteProfile(){
        setShowAlart(true)
        
    }
    function confirmDeleteProfile(){
        console.log("confirm Deleted")
        setShowAlart(false)
    }
    function openEditProfile(){
        props.setShowMainPage(false)
        props.setShowSideNav(false)
        props.setShowProfileSettings(true)
    }

    async function confirmDeleteProfile(){
        let isProfileCreated = localStorage.getItem("user_local_data")
        let userData = isProfileCreated && JSON.parse(isProfileCreated) 
        let documentId = isProfileCreated ? userData?.user_id : props.data?.userProfile.id

        const localDataStr = localStorage.getItem("user_local_data")
        const localData = localDataStr ? JSON.parse(localDataStr) : null

        props.setIsDeleting(true)
        //const result = await deleteUserProfile(documentId)
        const result = await deleteAllOtherProfiles()
       if(typeof result === "string" && result.startsWith("error")){
            //setErr(result)
            props.setIsDeleting(false)
            console.log(result)
            props.setShowSideNav(false)
        }else{
            //setData(result)
            const notCreated = false
            localStorage.setItem("profileCreated", notCreated.toString())
            localStorage.removeItem("user_local_data")
            props.setProfileIsCreated(notCreated)
            props.setIsDeleting(false)
            console.log(result)
            console.log('Profile deleted successfully')
            props.setShowSideNav(false) 
            setShowAlart(false)
        }
        }
    return(
        <>
            {showAlart && 
                <AlartBox
                    alartText={"Are Sure You want to Delete Your Profile, This Action Irreversible."} 
                    alartPositiveBtnText={props.isDeleting ? "Deleting..." : "Delete"}
                    alartCancelFunction={() => setShowAlart(false)}
                    alartPositiveFunction={confirmDeleteProfile}
                    bgColor={"red"}
                    opacity={props.isDeleting ? "0.5": "1"}
                />}
            <nav 
            className="side-nav" 
            >
                <div onClick={closeNav} className="close-button">
                    <img src={close} alt="close" />
                </div>
                <form onSubmit={searchUser} className="search">
                    <input 
                        type="text" 
                        placeholder="search existing user..." 
                        className="nav-input"
                        onFocus={() => setIsSearch(true)}
                        onBlur={(e) => {
                            // Delay hiding to allow click inside suggestion box
                            setTimeout(() => setIsSearch(false), 200);
                        }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}/> 
                    <button className="search-button"> <img src={search} alt="search logo" /> </button>
                    {isSearch && query.trim() !== ""  && 
                 <SuggestionBox nameQuery={query} onSelect={props.onUserSelect} isSearch={isSearch}/>}
                </form>
                    
                
                <ul className="nav-ul">
                    {props.profileIsCreated  ? 
                    <>
                    <li onClick={() => openEditProfile()}> 
                        <img src={edit} alt="edit logo" /> <span>Edit Your Profile</span>
                    </li>
                    <li onClick={() => deleteProfile()}> 
                        <img src={deleteLogo} alt="delete logo" /> <span>Delete your profile</span>
                    </li>
                    </>:
                    <li onClick={displayProfileSettings}> 
                        <img src={add} alt="add logo" /> <span>Add your profile</span>
                    </li>}
                </ul>
            </nav>
        </>
    )
}
