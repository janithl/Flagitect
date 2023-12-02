import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { getSystemVersion } from 'react-native-device-info';
import * as ScopedStorage from 'react-native-scoped-storage';
import RNFetchBlob from 'rn-fetch-blob';

const { android, fs, ios } = RNFetchBlob;

export enum FileTypes {
  SVG = 'SVG',
  PNG = 'PNG',
  HTML = 'HTML',
  NONE = '',
}

const mimeType = {
  [FileTypes.PNG]: 'image/png',
  [FileTypes.SVG]: 'image/svg+xml',
  [FileTypes.HTML]: 'text/html',
  [FileTypes.NONE]: 'application/octet-stream',
};

const extension = {
  [FileTypes.PNG]: '.png',
  [FileTypes.SVG]: '.svg',
  [FileTypes.HTML]: '.html',
  [FileTypes.NONE]: '',
};

export const saveFile = async (
  filename: string,
  filetype: FileTypes,
  contents: string,
): Promise<void> => {
  const encoding = filetype === FileTypes.PNG ? 'base64' : 'utf8';
  const path = `${fs.dirs.CacheDir}/${filename}${extension[filetype]}`;
  if (__DEV__) console.log({ path, encoding, contents });

  if (Platform.OS === 'ios') {
    fs.writeFile(path, contents, encoding)
      .then(() => ios.previewDocument(path))
      .catch(console.error);
    return;
  }

  // For Android 11 and above, we need to use Scoped Storage
  if (parseInt(getSystemVersion()) > 10) {
    const dir = await ScopedStorage.openDocumentTree(true);
    if (dir) {
      try {
        await ScopedStorage.writeFile(
          dir?.uri,
          contents,
          `${filename}${extension[filetype]}`,
          mimeType[filetype],
          encoding,
        );
      } catch (err) {
        Alert.alert('Error Saving File', err?.message);
      }
    } else {
      Alert.alert('Error Saving File', 'User did not select a directory');
    }
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
      fs.writeFile(path, contents, encoding)
        .then(() => android.actionViewIntent(path, mimeType[filetype]))
        .catch(console.error);
    } else {
      Alert.alert('Error Saving File', 'Permission Denied');
    }
  } catch (err) {
    Alert.alert('Error Saving File', err?.message);
  }
};
