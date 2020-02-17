import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ApplicationStyles from '../Theme/ApplicationStyles';
import ContainerWrapper from '../Components/ContainerWrapper';
import CustomNavBar from '../Components/CustomNavBar';
import {setToken} from '../Utilities/Stroage';
import Toast from 'react-native-root-toast';
import {getParams} from '../Utilities/Transform';

class QrCodeScreen extends Component {
  constructor(props) {
    super(props);
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
      this.props.navigation.goBack();
    }
  };

  componentWillUnmount(): void {
    this.qrCodeScanHandler = null;
  }

  render() {
    return (
      <ContainerWrapper>
        <CustomNavBar title={'Scan Qr Code'} isBack />
        <View style={styles.mainContainer}>
          <QRCodeScanner
            reactivate={true}
            reactivateTimeout={3000}
            onRead={this.onSuccess}
          />
        </View>
      </ContainerWrapper>
    );
  }
}

export default QrCodeScreen;

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
});
