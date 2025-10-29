import { useRef, useState, useEffect } from 'react'
import Header from "./components/Header"
import UserProfile from "./components/UserProfile"
import SideNav from './components/SideNav'
import CreateProfile from "./components/CreateProfile"
import AlartBox from './components/AlartBox'
import { fetchProfiles} from "./fetchProfile"
import TopNotification from './components/TopNotification'
import ProfileSkeleton from './components/ProfileSkeleton'
import SingleUserProfile from './components/SingleUserProfile'

function App() {
  localStorage.setItem("profileCreated", true)
  localStorage.setItem("userData", JSON.stringify({ name: "Adedamola", user_id:68fcdc06609ac0579b58 }));
  const [showMainPage, setShowMainPage] = useState(true)
  const [showSideNav, setShowSideNav] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showViewProfile, setShowViewProfile] = useState(false)
  let isProfileCreated = localStorage.getItem("profileCreated")
  const [profileIsCreated, setProfileIsCreated] = useState(isProfileCreated ? JSON.parse(isProfileCreated) : false)
  //const [userLocalData, setUserLocalData] = useState(profileIsCreated ? localStorage.getItem("user_local_data"): "")
  const [err, setErr] = useState("")
  const [data, setData] = useState({
    userProfile: null,
    otherProfiles: [],
  })
  const [isDeleting, setIsDeleting] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState("") // 'info', 'success', 'warning', 'error'
  const [notificationIsVisible, setNotificationIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [singleUserData, setSingleUserData] = useState(null)
  const [isUser, setIsUser] = useState(false)

  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true)
    const result = await fetchProfiles()
    if(typeof result === "string" && result.startsWith("error")){
        setErr(result)
        setLoading(true)
    }else{
        setData(result)
        setLoading(false)
      }
      console.log(result)
      }
    loadProfiles()
    
    },[profileIsCreated])

  
  async function openPersonalProfile() {
    const singleUser = await data.userProfile
    setIsUser(true)
    setSingleUserData(singleUser)
    setShowMainPage(false)
    setShowViewProfile(true)
  }

  async function openSingleUserProfile(id) {
    console.log(id)
    const singleUser = await data.otherProfiles.find(
      (singleProfile) => id === singleProfile.$id
    )
    setSingleUserData(singleUser)
    setShowMainPage(false)
    setShowViewProfile(true)
  }
  //   async function openSingleUserProfile(id) {
  //   console.log("🔍 Looking for user with id:", id);
  //   const singleUser = data.otherProfiles.find(
  //     (singleProfile) => id === singleProfile.$id
  //   );

  //   if (!singleUser) {
  //     console.warn("⚠️ User not found for id:", id);
  //     console.log("Available IDs:", data.otherProfiles.map(p => p.$id));
  //     return; // Prevents setting undefined
  //   }

  //   console.log("✅ Found user:", singleUser);

  //   setSingleUserData(singleUser);
  //   setShowMainPage(false);
  //   setShowViewProfile(true);
  // }

  function onUserSelect(id){
    openSingleUserProfile(id)
  }
  
  const userProfilesElement =
  data.userProfile && (
    <UserProfile
      key={data.userProfile.$id}
      userName={data.userProfile.name}
      userRole={data.userProfile.role}
      userBio={data.userProfile.bio}
      image={data.userProfile.image}
      onClick={() => openPersonalProfile(data.userProfile.$id)}
    />
  )

const otherProfilesElements =
  data.otherProfiles.length > 0 &&
  data.otherProfiles.map((profile) => (
    <UserProfile
      key={profile.$id}
      userName={profile.name}
      userRole={profile.role}
      userBio={profile.bio}
      image={profile.image}
      onClick={() => openSingleUserProfile(profile.$id)}
    />
  ))

  return (
    <>
     <TopNotification 
      notificationMessage={notificationMessage}
      notificationType={notificationType}
      notificationIsVisible={notificationIsVisible}
      />
     {showMainPage &&
      <>
        <Header 
          setShowSideNav={setShowSideNav} 
          setShowProfileSettings={setShowProfileSettings}
          setShowMainPage={setShowMainPage}
          profileIsCreated={profileIsCreated}
          setProfileIsCreated={setProfileIsCreated}
          data={data}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          onUserSelect={onUserSelect}
        />
         {showSideNav && 
        <SideNav 
          setShowSideNav={setShowSideNav}
          setShowProfileSettings={setShowProfileSettings}
          setShowMainPage={setShowMainPage}
          profileIsCreated={profileIsCreated}
          isDeleting={isDeleting}
          setProfileIsCreated={setProfileIsCreated}
          setIsDeleting={setIsDeleting}
          onUserSelect={onUserSelect}
        />}
        <main style={{height: loading && "90vh", overflow: loading && "hidden"}}>
          {loading ? <ProfileSkeleton /> : userProfilesElement}
          {loading ? <><ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton /></> : otherProfilesElements}
        </main>
      </>}
      {showProfileSettings && 
      <>
        {profileIsCreated ? 
        (<CreateProfile 
          setShowProfileSettings={setShowProfileSettings}
          setShowMainPage={setShowMainPage}
          profileIsCreated={profileIsCreated}
          setProfileIsCreated={setProfileIsCreated}
          userProfileData={data.userProfile}
        />) 
        :
       (<CreateProfile 
          setShowProfileSettings={setShowProfileSettings}
          setShowMainPage={setShowMainPage}
          profileIsCreated={profileIsCreated}
          setProfileIsCreated={setProfileIsCreated}
        />)}
      </>}
      {showViewProfile  && (
        <SingleUserProfile 
          SingleUserData={singleUserData}
          setShowMainPage={setShowMainPage}
          setShowViewProfile={setShowViewProfile}
          isUser={isUser}
          setShowProfileSettings={setShowProfileSettings}
          setIsUser={setIsUser}
        />
      )
        
      }


    </>
  )
}

export default App
