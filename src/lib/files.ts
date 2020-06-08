import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const { android, fs, ios } = RNFetchBlob;

export enum FileTypes {
  SVG = 'SVG',
  PNG = 'PNG',
}

const mimeType = {
  [FileTypes.PNG]: 'image/png',
  [FileTypes.SVG]: 'image/svg+xml',
};

const extension = {
  [FileTypes.PNG]: 'png',
  [FileTypes.SVG]: 'svg',
};

export const saveFile = async (
  filename: string,
  filetype: FileTypes,
  contents: string,
): Promise<void> => {
  if (Platform.OS === 'ios') {
    const path = `${fs.dirs.CacheDir}/${filename}.${extension[filetype]}`;
    fs.writeFile(path, contents, 'base64').then(() =>
      ios.previewDocument(path),
    );
    return;
  }

  const path = `${fs.dirs.DownloadDir}/${filename}.${extension[filetype]}`;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Flagitect File Write Permission',
        message: 'Flagitect wants to save your flag to your phone storage',
        buttonPositive: 'Allow',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      fs.writeFile(path, contents, 'base64').then(() =>
        android.actionViewIntent(path, mimeType[filetype]),
      );
    } else {
      Alert.alert('Error Writing File', 'Permission Denied');
    }
  } catch (err) {
    Alert.alert('Error Writing File', err.message);
  }
};
