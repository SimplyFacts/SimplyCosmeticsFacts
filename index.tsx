import 'react-native-url-polyfill/auto';
global.Buffer = require('buffer').Buffer;

import '@expo/metro-runtime';
import { registerRootComponent } from 'expo';
import App from './entrypoint';

registerRootComponent(App);
