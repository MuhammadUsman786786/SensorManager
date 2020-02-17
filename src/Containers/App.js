import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, {Component} from 'react';
import HomeScreen from './HomeScreen';
import QrCodeScreen from './QrCodeScreen';
import WizardScreen from './WizardScreen';

console.ignoredYellowBox = [
  'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
  'source.uri should not be an empty string',
  'Invalid props.style key',
];
console.disableYellowBox = true;

const PrimaryNav = createStackNavigator(
  {
    WizardScreen: {screen: WizardScreen},
    HomeScreen: {screen: HomeScreen},
    QrCodeScreen: {screen: QrCodeScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'WizardScreen',
  },
);

const AppContainer = createAppContainer(PrimaryNav);

export default class AppWrapper extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppContainer />
      </View>
    );
  }
}
