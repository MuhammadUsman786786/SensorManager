import {Colors} from './Colors';
import {Fonts} from './Fonts';
import {moderateScale} from 'react-native-size-matters';

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    justifyAlignCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleStyle: {
      fontSize: Fonts.regular,
      color: Colors.black,
      fontWeight: 'bold',
    },
    fontWeightBold: {
      fontWeight: 'bold',
    },
    textAlignCenter: {
      textAlign: 'center',
    },
    textAlignRight: {
      textAlign: 'right',
    },
    flexRow: {
      flexDirection: 'row',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    cardStyle: {
      borderRadius: moderateScale(10),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(10),
      backgroundColor: Colors.white,
    },
  },
  modalDropDownStyle: {
    sectionTextStyle: {
      fontSize: Fonts.regular,
      fontWeight: 'bold',
      color: Colors.primaryColor,
    },
    optionTextStyle: {
      fontSize: Fonts.regular,
      color: Colors.white,
    },
    cancelTextStyle: {
      fontSize: Fonts.regular,
      color: Colors.brightBlack,
    },
    optionContainerStyle: {
      backgroundColor: 'rgba(0,0,0,0.9)',
    },
    cancelContainerStyle: {
      color: Colors.primaryColor,
    },
    cancelStyle: {
      backgroundColor: Colors.primaryColor,
    },
    selectedItemTextStyle: {
      color: Colors.secondaryColor,
    },
  },
};

export default ApplicationStyles;
