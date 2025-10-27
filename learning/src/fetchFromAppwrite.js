export default async function fetchProfiles() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    console.log("Profiles:", response.documents);
  } catch (error) {
    console.error("Error fetching profiles:", error);
  }
}
