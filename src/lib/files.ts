import { Alert, Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

const { fs, MediaCollection, ios, android } = ReactNativeBlobUtil;

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
  try {
    const encoding = filetype === FileTypes.PNG ? 'base64' : 'utf8';

    const tempPath = `${fs.dirs.CacheDir}/${filename}${extension[filetype]}`;

    await fs.writeFile(tempPath, contents, encoding);

    if (Platform.OS === 'ios') {
      ios.previewDocument(tempPath);
      return;
    }

    const mediaType = filetype === FileTypes.PNG ? 'Image' : 'Download';

    const savedPath = await MediaCollection.copyToMediaStore(
      {
        name: `${filename}${extension[filetype]}`,
        parentFolder: 'Flagitect',
        mimeType: mimeType[filetype],
      },
      mediaType,
      tempPath,
    );

    if (!savedPath) {
      throw new Error('Failed to save file');
    }

    android.actionViewIntent(savedPath, mimeType[filetype]);
  } catch (err: any) {
    console.error(err);

    Alert.alert('Error Saving File', err?.message || 'Unknown error');
  }
};
