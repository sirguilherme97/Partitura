/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';

import App from './src/navigation/Navigator'

AppRegistry.registerComponent(appName, () => App);
