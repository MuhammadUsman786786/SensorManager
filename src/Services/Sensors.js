import axios from 'axios';
import {getToken} from '../Utilities/Stroage';
import * as _ from 'lodash';
import Toast from 'react-native-root-toast';
// fdwFDFWDFWFWFweWET35JOJfdSWQOKASFWROJF
const BASE_URL = 'http://smartlink-staging.tom-it.nl/api/sensors';
export const fetchData = () => {
  return new Promise(async (resolve, reject) => {
    const token = await getToken();
    // const token = testToken;
    if (_.isEmpty(token) || _.isNull(token) || _.isUndefined(token)) {
      Toast.show('Token is Empty Scan token on Setting Page', {
        position: Toast.positions.CENTER,
      });
      resolve([]);
    }
    axios
      .get(`${BASE_URL}/${token}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(() => {
        reject();
      });
  });
};
