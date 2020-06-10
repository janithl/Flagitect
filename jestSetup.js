import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('rn-fetch-blob', () => ({
  DocumentDir: jest.fn(),
  ImageCache: {
    get: {
      clear: jest.fn(),
    },
  },
  fs: {
    dirs: {
      MainBundleDir: jest.fn(),
      CacheDir: jest.fn(),
      DocumentDir: jest.fn(),
    },
  },
}));
