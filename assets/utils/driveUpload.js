// utils/driveUpload.js
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

export const uploadPhotoToDrive = async (photoUri) => {
  try {
    const accessToken = await SecureStore.getItemAsync('driveAccessToken');
    
    // Read file content
    const fileContent = await FileSystem.readAsStringAsync(photoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'image/jpeg',
          'Content-Length': `${fileContent.length * 0.75}` // Approximate base64 size
        },
        body: JSON.stringify({
          name: `photo_${Date.now()}.jpg`,
          mimeType: 'image/jpeg'
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};