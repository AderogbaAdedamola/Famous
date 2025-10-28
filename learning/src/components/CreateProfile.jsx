import { useRef, useState, useEffect } from "react"
import AlartBox from "./AlartBox"
import axios from "axios"
import arrowBack from "../assets/arrow-back.svg"
import profilePlaceholder from "../assets/profile-placeholder.png"
import { databases } from "../lib/appwriteConfig"
import { Permission, Role } from "appwrite";
import { updateUserProfile } from "../updateProfile"
import { fetchProfiles} from "../fetchProfile"
import CreateProfileSkeleton from './CreateProfileSkeleton'


export default function CreateProfile(props){
    const [userName, setUserName] = useState("")
    const [userRole, setUserRole] = useState("")
    const [userBio, setUserBio] = useState("")
    const [showAlart, setShowAlart] = useState(false)
    const [alartText, setAlartText] = useState("")
    const [alartPositiveBtnText, setAlartPositiveBtnText] = useState("")
    const [funcForSave, setFuncForSave] = useState(false)
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");
    const [error, setError] = useState("")
    const [imageUploaded, setImageUploaded] = useState(false)
    const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID
    const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState("")
    const [userData, setUserData] = useState(null)
    const [updatedData, setUpdatedData] = useState({})

  
    useEffect(() => {
    if (props.userProfileData) {
      setUserData(props.userProfileData)
     }
    }, [props.userProfileData])

    if (!userData && props.profileIsCreated) { 
      
    return (
        <div className="create-profile-container">
          <header className="craete-profile-header">
              <span className="arrow-back-container" onClick={arrowBackAction}>
                  <img src={arrowBack} alt="back" />
              </span>
              <span>Profile Settings</span>
          </header>
          <main className="create-profile-main">
            <CreateProfileSkeleton />
          </main>
        </div>
      );
    }

    function closeAlartBox(){
        setShowAlart(false)
    }

    function closeProfileSettings(){
      if(isLoading){
        return
       }else{
        setAlartText("Are You Sure You want to exit this section, Your actions will not be saved")
        setAlartPositiveBtnText("Exit")
        setFuncForSave(false)
        setShowAlart(true)
       }
    }
    function formAction(event) {
    event.preventDefault();

    if (isLoading) return;

    // Get the form data from the submitted form
    const formData = new FormData(event.target);

    const name = formData.get("name");
    const role = formData.get("role");
    const bio = formData.get("bio");
    setUserName(name)
    setUserRole(role)
    setUserBio(bio)
    if(props.profileIsCreated){
            setUpdatedData({
              name: userName ? userName : userData.name,
              role: userRole ? userRole : userData.role,
              bio: userBio ? userBio : userData.bio,
              image: url ? url : userData.image
          })}
    saveChanges()
    }

    function saveChanges(){
        setAlartText(`Confirm to Save your profile, Note: You won't be able to create another profile after this`)
        setAlartPositiveBtnText("Save")
        setFuncForSave(true)
        setShowAlart(true)
    }
    function confirmCloseProfile(){
        setFuncForSave(false)
        props.setShowMainPage(true)
        props.setShowProfileSettings(false)
        if(props.profileIsCreated){
          let isProfileCreated = localStorage.getItem("profileCreated")
          props.setProfileIsCreated(false)
          setTimeout(() => props.setProfileIsCreated(isProfileCreated ? JSON.parse(isProfileCreated) : true), 100)
        }
        setShowAlart(false)
        console.log("close profile")
    }
    function arrowBackAction(){
           closeProfileSettings()
    }
    // Handle File Upload
    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
    
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (!validTypes.includes(selected.type)) {
          setError("Only image files (JPG, PNG, WEBP) are allowed!");
          setFile(null);
          return;
        }
    
        if (selected.size > 5 * 1024 * 1024) {
          setError("File must be less than 5MB!");
          setFile(null);
          return;
        }
    
        setError("");
        setFile(selected);
        setImageUploaded(false)
      };
    
      const uploadImage = async () => {
        if (!file) {
          setError("Please select a valid image first!");
          return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_FAMOUS_PRESET); // set in Cloudinary
        formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    
        try {
          const res = await axios.post(
            import.meta.env.VITE_CLOUD_ENDPOINT,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                );
                setProgress(percent);
              },
            }
          );
          setUrl(res.data.secure_url)
          console.log(url)
          setProgress(100)
          setTimeout(()=>{
            setProgress(0)
          },1000)
          setError("Upload Success")
          setImageUploaded(true)
          if(props.profileIsCreated){
            setUpdatedData({
              name: userName ? userName : userData.name,
              role: userRole ? userRole : userData.role,
              bio: userBio ? userBio : userData.bio,
              image: url ? url : userData.image
          })}
        } catch (err) {
          setError("Upload failed. Please try again.");
          console.error(err);
        }
      }
    //   Upload To Appwrite

    async function addProfileToDatabase() {
        setShowAlart(false)
      try {
        setIsLoading(true)
        const response = await databases.createDocument(
          databaseId,
          collectionId,
          "unique()", // auto-ID
          {
            name: userName,
            role: userRole,
            bio: userBio,
            image: url
          }
          // , 
          // [
          //   Permission.read(Role.any()),
          //   Permission.write(Role.any())
          // ]
        );
        console.log("Profile added:", response)
        setIsLoading(false)
        let localStorageData = {
          user_name : response.name,
          user_id : response.$id
        }
        localStorage.setItem("user_local_data", JSON.stringify(localStorageData))
        //props.setUserLocalData(localStorageData)
        localStorage.setItem("profileCreated", true)
        console.log(localStorage.getItem("user_local_data"))
        props.setProfileIsCreated(true)
        props.setShowProfileSettings(false)
        props.setShowMainPage(true)

      } catch (error) {
        setIsLoading(true)
        console.error("error adding profile:", error)
      }
    } 

    async function updateProfileFunc(){
          setShowAlart(false)
          setIsLoading(true)
      const result = await updateUserProfile(updatedData)
          if(typeof result === "string" && result.toLowerCase().startsWith("error")){
            setIsLoading(false)
            setErr(result)
          }else{
            setIsLoading(false)
            setUserData(result)
            props.setShowProfileSettings(false)
            props.setShowMainPage(true)
            let isProfileCreated = localStorage.getItem("profileCreated")
            props.setProfileIsCreated(false)
            setTimeout(() => props.setProfileIsCreated(isProfileCreated ? isProfileCreated : true), 100)
          }
          console.log(result)
    }
    
    return(
        <>
           {showAlart && 
            <AlartBox
                alartText={alartText} 
                alartPositiveBtnText={alartPositiveBtnText}
                alartCancelFunction={closeAlartBox}
                alartPositiveFunction={!funcForSave ?  confirmCloseProfile : props.profileIsCreated ? updateProfileFunc :  addProfileToDatabase }
            />}
            <div className="create-profile-container">
                <header className="craete-profile-header">
                    <span className="arrow-back-container" onClick={arrowBackAction}>
                        <img src={arrowBack} alt="back" />
                    </span>
                    <span>Profile Settings</span>
                </header>
                <main className="create-profile-main">
                    <form onSubmit={formAction} className="create-profile-form">
                        <div className="img-info-container">
                            <div className="img-container">
                                <h3>Your Photo</h3>
                                <p>This will appear on your profile.</p>
                                <div>
                                    <div className="your-photo-container">
                                        <img src={url ? url : props.profileIsCreated && userData !== null ? userData.image : profilePlaceholder} alt="Your Photo" />
                                    </div>
                                    <p>
                                        {error  ? 
                                        <span
                                            style={{color: imageUploaded ? "#454648" : "red"}}
                                        >{error}</span>:
                                        file ?  
                                        <span >You Selected: {file.name}</span> :
                                        "PNG,JPG or WEBP. Max size of 5MB"}
                                    </p>
                                    {progress !==0  ?
                                    <h3 className="progress-bar">Progress : {progress}%</h3>:
                                    <label >Click To {file ? "change" : "Add"} your Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: "none" }} // hides "No file chosen"
                                            />
                                    </label>}
                                    {file &&
                                    !imageUploaded &&
                                    <button 
                                        type="button"
                                        onClick={uploadImage}
                                    >Upload Your Photo
                                    </button>}
                                </div>
                                
                            </div>
                            <div className="info-container">
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Enter your full name" 
                                    id="name"
                                    onChange={(e) => setUserName(e.target.value)}
                                    defaultValue={props.profileIsCreated && userData !== null ? userData.name : ""}
                                    required
                                />
                                <label htmlFor="role">Role</label>
                                <input 
                                    type="text" 
                                    name="role" 
                                    id="role"
                                    onChange={(e) => setUserRole(e.target.value)}
                                    placeholder="e.g Senior Software Engineer"
                                    defaultValue={props.profileIsCreated && userData !== null ? userData.role : ""}
                                    required
                                />
                                <label htmlFor="bio">Biography</label>
                                <textarea 
                                    name="bio" 
                                    id="bio" 
                                    onChange={(e) => setUserBio(e.target.value)}
                                    placeholder="Tell us a bit about yourself.This will be displayed on your public profile."
                                    defaultValue={props.profileIsCreated && userData !== null ? userData.bio : ""}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="save-button-container">
                            <button id="cancel" type="button" style={{opacity: isLoading && "0.5"}} onClick={closeProfileSettings}>Cancel</button>
                            <button id="save" type="submit" style={{opacity: isLoading && "0.5"}} >{isLoading ? "Loading..." : "Save Changes" }</button>
                            
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}
