import {SENSOR_STATUS} from './Constants';
import * as _ from 'lodash';
import {Colors} from '../Theme/Colors';

export const getParams = props => {
  return _.get(props, 'navigation.state.params', {});
};

export const getSensorDataValue = sensorItem => {
  const {data = {}} = sensorItem || {};
  let {value1 = null} = data || {};
  if (_.isNull(value1)) {
    return {
      status: SENSOR_STATUS.EMPTY,
      leftBarColor: Colors.lightGrey,
      rightBarColor: Colors.lightGrey,
      textColor: Colors.primaryColor,
      leftBarWidth: '100%',
      rightBarWidth: '0%',
    };
  }
  value1 = _.toInteger(value1);

  if (value1 >= 0 && value1 <= 50) {
    return {
      status: SENSOR_STATUS.RED,
      leftBarColor: Colors.darkRed,
      rightBarColor: Colors.lightRed,
      textColor: Colors.darkRed,
      leftBarWidth: `${value1}%`,
      rightBarWidth: `${100 - value1}%`,
    };
  } else if (value1 >= 51) {
    return {
      status: SENSOR_STATUS.GREEN,
      leftBarColor: Colors.darkGreen,
      rightBarColor: Colors.lightGreen,
      textColor: Colors.darkGreen,
      leftBarWidth: `${value1}%`,
      rightBarWidth: `${100 - value1}%`,
    };
  }
};
