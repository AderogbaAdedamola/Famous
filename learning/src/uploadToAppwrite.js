import { databases, databaseId ,collectionId } from "./lib/appwriteConfig";



export default async function addProfile() {
  try {
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      "unique()", // auto-ID
      {
        name: "John Doe",
        email: "john@example.com",
        age: 21,
        image: "https://res.cloudinary.com/yourname/image/upload/photo.jpg"
      }
    );
    console.log("Profile added:", response);
  } catch (error) {
    console.error("Error adding profile:", error);
  }
}
