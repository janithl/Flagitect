import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Alert, PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const { fs } = RNFetchBlob;

const childToWeb = (child: JSX.Element) => {
  const { type, props } = child;
  const name = type && type.displayName;
  const webName = name && name[0].toLowerCase() + name.slice(1);
  const Tag = webName ? webName : type;
  return <Tag {...props}>{toWeb(props.children)}</Tag>;
};

const toWeb = (children: JSX.Element[] | JSX.Element) =>
  React.Children.map(children, childToWeb);

export const serialiseSVG = (element: JSX.Element): string => {
  return ReactDOMServer.renderToStaticMarkup(toWeb(element));
};

export const saveFile = async (
  filename: string,
  contents: string,
): Promise<void> => {
  const path = [fs.dirs.DownloadDir, filename].join('/');
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
      fs.writeFile(path, contents, 'utf8').then(() =>
        Alert.alert('File Written Successfully', `File written to ${path}`),
      );
    } else {
      Alert.alert('Error Writing File', 'Permission Denied');
    }
  } catch (err) {
    Alert.alert('Error Writing File', err.message);
  }
};
