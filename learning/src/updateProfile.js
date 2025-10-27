// 📁 updateProfile.js
import { Query } from "appwrite"
import { databases, databaseId, collectionId } from "./lib/appwriteConfig"


// ⚙️ Function to update user profile
export async function updateUserProfile(updatedData) {
  try {
    // 1️⃣ Get current user's ID from localStorage
    const userLocalData = JSON.parse(localStorage.getItem("user_local_data"))
    const userId = userLocalData.user_id
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    // 2️⃣ Find user's profile document in database by userId
    const result = await databases.listDocuments(
      databaseId,     
      collectionId,   
      [Query.equal("$id", userId)]
    );

    if (result.documents.length === 0) {
      throw new Error(" User profile not found in database");
    }

    // 3️⃣ Extract the document ID
    const documentId = result.documents[0].$id;

    // 4️⃣ Update that document
    const response = await databases.updateDocument(
      databaseId,
      collectionId,
      documentId,
      updatedData
    );

    console.log("Profile updated successfully:", response);
    return response;

  } catch (error) {
    console.error("error updating profile:", error);
    return error;
  }
}
