import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const DriveLinkingScreen = () => {
  const router = useRouter();
  const [driveLinked, setDriveLinked] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Configure Google Auth with Drive permissions
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '997210725348-tdj10johhiu1bo97guoi8s02cse2vs1h.apps.googleusercontent.com',
    scopes: [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.appdata',
      'profile',
      'email',
      'offline_access' // Important for refresh token
    ],
  });

  // Handle Drive linking when the auth response changes
  useEffect(() => {
    const linkDrive = async () => {
      // Check that we have a successful response and authentication data
      if (response?.type === 'success' && response.authentication) {
        try {
          // Cast authentication to an object that contains accessToken and optionally refreshToken
          const { accessToken, refreshToken } = response.authentication as {
            accessToken: string;
            refreshToken?: string;
          };

          // Store tokens securely using SecureStore
          await SecureStore.setItemAsync('driveAccessToken', accessToken);
          if (refreshToken) {
            await SecureStore.setItemAsync('driveRefreshToken', refreshToken);
          }

          // Verify Drive access by fetching account info from the Drive API
          const driveResponse = await fetch(
            'https://www.googleapis.com/drive/v3/about?fields=user',
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          if (driveResponse.ok) {
            setDriveLinked(true);
            Alert.alert('Success', 'Google Drive linked successfully!');
          } else {
            throw new Error('Failed to verify Drive access');
          }
        } catch (err) {
          // Type-narrow the error before accessing its message
          if (err instanceof Error) {
            setError(err.message);
            Alert.alert('Error', err.message);
          } else {
            const errMsg = String(err);
            setError(errMsg);
            Alert.alert('Error', errMsg);
          }
        }
      }
    };

    linkDrive();
  }, [response]);

  // Example upload function with a properly typed fileUri parameter
  const uploadToDrive = async (fileUri: string) => {
    setUploading(true);
    try {
      const accessToken = await SecureStore.getItemAsync('driveAccessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const formData = new FormData();
      // In React Native, you need to pass a file object with uri, type, and name.
      // We cast it as 'any' to avoid TypeScript errors because it doesn't match the standard Blob type.
      formData.append('file', {
        uri: fileUri,
        type: 'image/jpeg',
        name: `photo_${Date.now()}.jpg`,
      } as any);

      const uploadResponse = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );

      if (!uploadResponse.ok) throw new Error('Upload failed');
      const data = await uploadResponse.json();
      Alert.alert('Success', 'Photo uploaded to Drive!');
      return data;
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert('Error', err.message);
        throw err;
      } else {
        const errMsg = String(err);
        Alert.alert('Error', errMsg);
        throw new Error(errMsg);
      }
    } finally {
      setUploading(false);
    }
  };

  // Function to unlink/revoke Drive access
  const unlinkDrive = async () => {
    await SecureStore.deleteItemAsync('driveAccessToken');
    await SecureStore.deleteItemAsync('driveRefreshToken');
    setDriveLinked(false);
    Alert.alert('Success', 'Drive access revoked');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        {driveLinked ? 'Google Drive Linked ✅' : 'Link Google Drive'}
      </Text>

      {!driveLinked ? (
        <Button
          title="Link Google Drive"
          onPress={() => promptAsync()}
          disabled={!request}
        />
      ) : (
        <>
          <Button title="Unlink Google Drive" onPress={unlinkDrive} color="red" />
          <View style={{ marginTop: 20 }}>
            <Button
              title="Upload Test File"
              onPress={() => uploadToDrive('some-file-uri')}
              disabled={uploading}
            />
          </View>
        </>
      )}

      {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
    </View>
  );
};

export default DriveLinkingScreen;
