jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

jest.mock('react-native-blob-util', () => ({
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

jest.mock('react-native-device-info', () => {
  return {
    getVersion: jest.fn(),
  };
});
