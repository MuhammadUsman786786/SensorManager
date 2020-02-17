import {AsyncStorage} from 'react-native';

export const setToken = token => {
  return AsyncStorage.setItem('token', token);
};

export const getToken = () => {
  return AsyncStorage.getItem('token');
};

export const setWizardStatus = () => {
  return AsyncStorage.setItem('wizardStatus', 'COMPLETED');
};

export const getWizardStatus = () => {
  return AsyncStorage.getItem('wizardStatus');
};
