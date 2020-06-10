import React from 'react';

import {
  AppState,
  Editor,
  EditorHeader,
  EditorModal,
  Footer,
} from '@components';

export default (): JSX.Element => (
  <AppState>
    <EditorHeader />
    <Editor />
    <Footer />
    <EditorModal />
  </AppState>
);
