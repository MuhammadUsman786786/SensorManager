import Reactotron from 'reactotron-react-native';
import {NativeModules} from 'react-native';

const scriptURL = NativeModules.SourceCode.scriptURL;
const host = scriptURL.split('://')[1].split(':')[0];
Reactotron.configure({name: 'Sensor Manager', host})
  .useReactNative()
  .connect();

// Let's clear Reactotron on every time we load the app
Reactotron.clear();

// Totally hacky, but this allows you to not both importing reactotron-react-native
// on every file.  This is just DEV mode, so no big deal.
console.tron = Reactotron;
