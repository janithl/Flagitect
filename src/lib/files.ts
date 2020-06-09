import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const { android, fs, ios } = RNFetchBlob;

export enum FileTypes {
  SVG = 'SVG',
  PNG = 'PNG',
  HTML = 'HTML',
}

const mimeType = {
  [FileTypes.PNG]: 'image/png',
  [FileTypes.SVG]: 'image/svg+xml',
  [FileTypes.HTML]: 'text/html',
};

const extension = {
  [FileTypes.PNG]: '.png',
  [FileTypes.SVG]: '.svg',
  [FileTypes.HTML]: '.html',
};

export const saveFile = async (
  filename: string,
  filetype: FileTypes,
  contents: string,
): Promise<void> => {
  const encoding = filetype === FileTypes.PNG ? 'base64' : 'utf8';
  const path = `${fs.dirs.CacheDir}/${filename}${extension[filetype]}`;

  if (Platform.OS === 'ios') {
    fs.writeFile(path, contents, encoding).then(() =>
      ios.previewDocument(path),
    );
    return;
  }

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
      fs.writeFile(path, contents, encoding).then(() =>
        android.actionViewIntent(path, mimeType[filetype]),
      );
    } else {
      Alert.alert('Error Writing File', 'Permission Denied');
    }
  } catch (err) {
    Alert.alert('Error Writing File', err.message);
  }
};
