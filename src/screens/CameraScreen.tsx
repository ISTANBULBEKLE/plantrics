import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const CameraScreen = () => {
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (typeof Platform.Version === 'number' && Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (typeof Platform.Version === 'number' && Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(tag, {type, album});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CameraScreen;
