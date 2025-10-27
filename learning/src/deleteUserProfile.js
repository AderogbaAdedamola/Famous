import { databases, databaseId, collectionId } from './lib/appwriteConfig'

export const deleteUserProfile = async (documentId) => {
  try {
    const response = await databases.deleteDocument(
      databaseId, 
      collectionId, 
      documentId
    );
    return response;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};