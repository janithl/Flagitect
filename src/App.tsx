import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  AppState,
  Editor,
  EditorHeader,
  EditorModal,
  Footer,
  Menu,
} from '@components';

export default (): JSX.Element => (
  <SafeAreaProvider>
    <AppState>
      <EditorHeader />
      <Editor />
      <Footer />
      <EditorModal />
      <Menu />
    </AppState>
  </SafeAreaProvider>
);
