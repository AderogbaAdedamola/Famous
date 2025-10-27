import { databases, databaseId, collectionId } from "./lib/appwriteConfig";

// Default export
let userProfile
let otherProfiles 
let err = null;

export async function fetchProfiles() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);

    // Get user ID from localStorage
    const storedUser = localStorage.getItem("user_local_data")
    const currentUser = storedUser ? JSON.parse(storedUser) : null

    // Separate user's profile from others
    const profiles = response.documents;
    userProfile = currentUser === null ? null : profiles.find((profile) => profile.$id === currentUser.user_id);
    otherProfiles = storedUser ? profiles.filter((profile) => profile.$id !== currentUser.user_id) : profiles

    return { userProfile, otherProfiles }
  } catch (error) {
    console.error("Error fetching profiles:", error);
    err = `error : ${error.message}` || "error : Failed to load profiles.";
    return  err 
  }
}

