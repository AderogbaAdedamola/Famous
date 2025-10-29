import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

// 🧩 Your database and collection IDs
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const OTHER_PROFILES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_OTHER_PROFILES_COLLECTION_ID;

async function deleteAllOtherProfiles() {
  try {
    // Step 1️⃣ — Fetch all documents from "otherProfiles"
    const response = await databases.listDocuments(
      DATABASE_ID,
      OTHER_PROFILES_COLLECTION_ID
    );

    console.log(`Found ${response.total} profiles.`);

    // Step 2️⃣ — Delete each document
    for (const doc of response.documents) {
      await databases.deleteDocument(
        DATABASE_ID,
        OTHER_PROFILES_COLLECTION_ID,
        doc.$id
      );
      console.log(`✅ Deleted profile: ${doc.$id}`);
    }

    console.log("🎉 All otherProfiles deleted successfully!");
  } catch (error) {
    console.error("❌ Error deleting profiles:", error);
  }
}

// Run the function
deleteAllOtherProfiles();
