export const uploadFileToDrive = async (
  // fileUri: string,
  // fileName: string,
  // mimeType: string
) => {
  const accessToken = await SecureStore.getItemAsync('driveAccessToken');

  const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const metadata = JSON.stringify({
    name: fileName,
    mimeType: mimeType,
  });

  const boundary = 'foo_bar_baz';
  const delimiter = `--${boundary}\r\n`;
  const closeDelimiter = `--${boundary}--`;
  const multipartBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    metadata +
    '\r\n' +
    delimiter +
    `Content-Type: ${mimeType}\r\n` +
    'Content-Transfer-Encoding: base64\r\n\r\n' +
    fileBase64 +
    '\r\n' +
    closeDelimiter;

  const contentLength = new TextEncoder().encode(multipartBody).length;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
        'Content-Length': contentLength.toString(),
      },
      body: multipartBody,
    }
  );

  return await response.json();
};















































// // utils/driveUpload.js
// import * as FileSystem from 'expo-file-system';
// import * as SecureStore from 'expo-secure-store';

// export const uploadPhotoToDrive = async (photoUri) => {
//   try {
//     const accessToken = await SecureStore.getItemAsync('driveAccessToken');
    
//     // Read file content
//     const fileContent = await FileSystem.readAsStringAsync(photoUri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     const response = await fetch(
//       'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'image/jpeg',
//           'Content-Length': `${fileContent.length * 0.75}`
//         },
//         body: JSON.stringify({
//           name: `photo_${Date.now()}.jpg`,
//           mimeType: 'image/jpeg'
//         }),
//       }
//     );

//     return await response.json();
//   } catch (error) {
//     console.error('Upload failed:', error);
//     throw error;
//   }
// };