import famous from "../assets/famous1.png"
import menuDark from "../assets/menu-dark.svg"
import addDark from "../assets/add-dark.svg"
import searchDark from "../assets/search-dark.svg"
import { useRef, useState } from "react"
import DropDown from "./DropDown"
import AlartBox from "./AlartBox"
import { deleteUserProfile } from "../deleteUserProfile"
import SuggestionBox from "./SuggestionBox"

export default function Header(props){
    const [isSearch, setIsSearch] = useState(false)
    const inputRef = useRef(null)
    const [showAlart, setShowAlart] = useState(false)
    const [showOther, setShowOther] = useState(true)
    const [query, setQuery] = useState("");
   

    function openNav(){
        props.setShowSideNav(true)
    }
    function displayProfileSettings(){
        props.setShowMainPage(false)
        props.setShowProfileSettings(true)
    }
    function searchUser(){
        event.preventDefault()
    }
    function handleClick(){
        setIsSearch(true)
        setShowOther(false)
        setTimeout(()=>{inputRef.current.focus()}, 900)
    }
     function deleteProfile(){
      setShowAlart(true)
    }
    async function confirmDeleteProfile(){
        let isProfileCreated = localStorage.getItem("user_local_data")
        let userData = isProfileCreated && JSON.parse(isProfileCreated) 
        let documentId = isProfileCreated ? userData?.user_id : props.data?.userProfile.id

        const localDataStr = localStorage.getItem("user_local_data")
        const localData = localDataStr ? JSON.parse(localDataStr) : null

        props.setIsDeleting(true)
        const result = await deleteUserProfile(documentId)
        if(typeof result === "string" && result.startsWith("error")){
            //setErr(result)
            props.setIsDeleting(false)
            console.log(result)
        }else{
            //setData(result)
            const notCreated = false
            localStorage.setItem("profileCreated", notCreated.toString())
            localStorage.removeItem("user_local_data")
            props.setProfileIsCreated(notCreated)
            props.setIsDeleting(false)
            console.log(result)
            console.log('Profile deleted successfully')
            setShowAlart(false)
        }
    }
    function openEditProfile(){
        props.setShowMainPage(false)
        props.setShowProfileSettings(true)
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
            <header>
                <div className="header-item1">
                    <img src={famous} alt="logo" />
                    <h2>Famous</h2>
                </div>
                <div className="menu-icon" onClick={openNav}>
                    <img src={menuDark} alt="Menu" />
                </div>
                <nav className="header-item2">
                    <ul>
                       { showOther  &&
                       <>
                        { props.profileIsCreated ?
                        <DropDown 
                            list1={"Edit Your Profile"}
                            list1Function={openEditProfile}
                            list2={"Delete Your Profile"}
                            list2Function={() => deleteProfile()}/> :
                        <li onClick={displayProfileSettings}>
                            <img src={addDark} alt="add" />
                            <span>Add Your Profile</span>
                        </li>}
                        <li 
                            onClick={handleClick}
                            style={{
                                display: isSearch ? "none" : "inline-flex" ,
                                transition: "all 0.9s ease" 
                            }}>
                            <img src={searchDark} alt="search" />
                            <span>search</span> 
                        </li>
                        </>}
                        <div className="header-search-container">
                            <form onSubmit={searchUser} className="header-search">
                            <input 
                                type="text" 
                                placeholder="search existing user..."
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onBlur={() =>{
                                    setIsSearch(false)
                                    setTimeout(() => setShowOther(true), 1000)
                                     }}
                                style={{
                                    width : isSearch ? "250px" : "0px",
                                    // display: isSearch ? "block" : "none",
                                    paddingLeft: isSearch ? "10px": "0px",
                                    border: isSearch ? "2px solid black" : "none",
                                    transition: "all 0.9s ease" 
                                }}
                                 /> 
                                { query.trim() !== ""  && 
                                 <SuggestionBox nameQuery={query} onSelect={props.onUserSelect} isSearch={isSearch}/>}
                            {/* <button  
                                style={{
                                    display: isSearch ? "block" : "none",
                                    transition: "all 0.9s ease" 
                                }}> 
                                <img src={searchDark} alt="search logo" /> 
                            </button> */}
                            </form>
                        </div>
                    </ul>
                </nav>
            </header>
        </>
    )
}
