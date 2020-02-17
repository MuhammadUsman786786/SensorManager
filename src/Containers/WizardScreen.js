import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ApplicationStyles from '../Theme/ApplicationStyles';
import ContainerWrapper from '../Components/ContainerWrapper';
import {getWizardStatus, setToken, setWizardStatus} from '../Utilities/Stroage';
import Toast from 'react-native-root-toast';
import {getParams} from '../Utilities/Transform';
import BackgroundImage from '../Components/BackgroundImage';
import {Button, Text} from 'galio-framework';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../Theme/Colors';
import {NavigationActions, StackActions} from 'react-navigation';
import {WIZARD_STATUS} from '../Utilities/Constants';

class WizardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    const {qrCodeScanHandler} = getParams(props);
    this.qrCodeScanHandler = qrCodeScanHandler;
  }

  onSuccess = async rawData => {
    const {data} = rawData || {};
    Toast.show('Qr code scanned Successfully', {
      position: Toast.positions.CENTER,
    });
    await setToken(data);
    if (this.qrCodeScanHandler) {
      this.qrCodeScanHandler();
    }
  };

  handleWizard = () => {
    getWizardStatus()
      .then(wizardStatus => {
        if (wizardStatus === WIZARD_STATUS.COMPLETED) {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'HomeScreen'})],
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          this.setState({isLoading: false});
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  componentDidMount() {
    this.handleWizard();
  }

  componentWillUnmount(): void {
    this.qrCodeScanHandler = null;
  }

  navigateToQrCodeScreen = () => {
    setWizardStatus();
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'HomeScreen'}),
        NavigationActions.navigate({routeName: 'QrCodeScreen'}),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <ContainerWrapper>
        <BackgroundImage
          source={require('../Images/image1.jpg')}
          container={styles.justifyAlignCenter}>
          <Text style={[styles.titleStyle, styles.titleOverrideTitle]}>
            Sensors
          </Text>
          <Text style={[styles.titleStyle, styles.subtitleOverrideTitle]}>
            Tracking
          </Text>
          <Button
            shadowless
            onPress={this.navigateToQrCodeScreen}
            style={styles.buttonStyle}>
            Get Started
          </Button>
        </BackgroundImage>
      </ContainerWrapper>
    );
  }
}

export default WizardScreen;

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  buttonStyle: {
    position: 'absolute',
    bottom: moderateScale(100),
    backgroundColor: Colors.primaryColor,
  },
  titleOverrideTitle: {
    color: Colors.white,
    fontSize: moderateScale(40),
  },
  subtitleOverrideTitle: {
    color: Colors.white,
    fontSize: moderateScale(25),
  },
});
