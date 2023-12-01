/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// Polyfill since Hermes does not support the TextEncoder interface
global.TextEncoder = require('text-encoding').TextEncoder;

AppRegistry.registerComponent(appName, () => App);
