import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import {ICON_TYPES} from '../Utilities/Constants';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../Theme/Colors';
import {Fonts} from '../Theme/Fonts';
import IconButton from './IconButton';
import ApplicationStyles from '../Theme/ApplicationStyles';

const CustomNavBar = (props = {}) => {
  const {title} = props || {};
  const {isBack, rightIconName, rightIconType, rightIconSize, rightIconColor} =
    props || {};
  const {rightIconPressHandler = () => {}} = props || {};
  return (
    <View style={[styles.container, {backgroundColor: props.backgroundColor}]}>
      <StatusBar backgroundColor={Colors.background} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={styles.leftHeaderContainer}>
          {isBack && (
            <IconButton
              name={'ios-arrow-back'}
              type={ICON_TYPES.IonIcons}
              size={moderateScale(22)}
              color={Colors.black}
              onPress={() => props.navigation.goBack()}
            />
          )}
        </View>
        <Text
          style={[
            styles.headerStyle,
            {color: props.titleColor || Colors.black},
          ]}>
          {title}
        </Text>
        <View style={styles.rightHeaderContainer}>
          {props.isRightIcon && (
            <IconButton
              name={rightIconName || 'setting'}
              type={rightIconType || ICON_TYPES.AntDesign}
              size={rightIconSize || moderateScale(22)}
              color={rightIconColor || Colors.black}
              onPress={rightIconPressHandler}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default withNavigation(CustomNavBar);

CustomNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

CustomNavBar.defaultProps = {
  title: '',
  style: {},
};

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    width: '100%',
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    ...Platform.select({
      android: {paddingVertical: moderateScale(6)},
    }),
  },
  headerStyle: {
    color: Colors.primaryColor,
    fontSize: Fonts.regular,
    alignItems: 'center',
  },
  titleBorderBottomStyle: {
    borderBottomWidth: verticalScale(3),
    borderBottomColor: Colors.primaryColor,
  },
  leftHeaderContainer: {
    width: scale(40),
    marginLeft: scale(10),
    justifyContent: 'center',
  },
  rightHeaderContainer: {
    width: scale(40),
    flexDirection: 'row',
    marginRight: scale(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
