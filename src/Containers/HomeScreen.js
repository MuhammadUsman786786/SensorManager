import React, {Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import ApplicationStyles from '../Theme/ApplicationStyles';
import {moderateScale, scale} from 'react-native-size-matters';
import {Colors} from '../Theme/Colors';
import * as _ from 'lodash';
import ContainerWrapper from '../Components/ContainerWrapper';
import {getSensorDataValue} from '../Utilities/Transform';
import CustomNavBar from '../Components/CustomNavBar';
import {NavigationEvents} from 'react-navigation';
import {fetchData} from '../Services/Sensors';
import {Card} from 'galio-framework';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      isRefreshing: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchDataHandler();
  }

  apiCaller = params => {
    this.setState({dataList: [], ...params});
    fetchData()
      .then(dataList => {
        this.setState({dataList, isLoading: false, isRefreshing: false});
      })
      .catch(() => {})
      .finally(() => {
        this.setState({isLoading: false, isRefreshing: false});
      });
  };

  fetchDataHandler = () => {
    this.apiCaller({isLoading: true});
  };

  onRefreshHandler = () => {
    this.apiCaller({isRefreshing: true});
  };

  renderListEmptyComponent = () => {
    if (this.state.isLoading && !this.state.isRefreshing) {
      return (
        <View style={[styles.emptyTextContainer]}>
          <ActivityIndicator color={Colors.primaryColor} size={'large'} />
        </View>
      );
    }
    if (this.state.isRefreshing) {
      return null;
    }
    return (
      <View style={[styles.emptyTextContainer]}>
        <Text style={[styles.titleStyle, styles.fontWeightBold]}>
          No Data is Found
        </Text>
      </View>
    );
  };

  renderSensorItem = ({item = {}}) => {
    const {sensor} = item || {};
    const {label} = sensor || {};
    const {
      textColor,
      leftBarColor,
      rightBarColor,
      leftBarWidth,
      rightBarWidth,
    } = getSensorDataValue(item) || {};
    return (
      <Card borderless style={styles.itemContainer}>
        <Text style={[styles.titleStyle, styles.titleAlignment]}>{label}</Text>
        <View style={styles.flexRow}>
          <View
            style={[
              styles.barStyle,
              {width: leftBarWidth, backgroundColor: leftBarColor},
            ]}
          />
          <View
            style={[
              styles.barStyle,
              {width: rightBarWidth, backgroundColor: rightBarColor},
            ]}
          />
        </View>
      </Card>
    );
  };

  qrCodeScanHandler = () => {
    this.setState({isLoading: true, dataList: []});
  };

  navigateToSetting = () => {
    this.props.navigation.push('QrCodeScreen', {
      qrCodeScanHandler: this.qrCodeScanHandler,
    });
  };

  render() {
    return (
      <ContainerWrapper>
        <NavigationEvents onDidFocus={this.fetchDataHandler} />
        <CustomNavBar
          title={'Sensors'}
          isRightIcon
          rightIconPressHandler={this.navigateToSetting}
        />
        <View style={styles.mainContainer}>
          <FlatList
            data={this.state.dataList || []}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderSensorItem}
            keyExtrator={item => _.toString(item.id)}
            ListEmptyComponent={this.renderListEmptyComponent}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefreshHandler}
                tintColor={Colors.primaryColor}
              />
            }
          />
        </View>
      </ContainerWrapper>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  contentContainerStyle: {
    paddingHorizontal: scale(10),
  },
  itemContainer: {
    marginTop: moderateScale(20),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(10),
  },
  emptyTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  titleAlignment: {
    marginTop: -moderateScale(30),
  },
  barStyle: {
    height: moderateScale(15),
    marginTop: moderateScale(12),
    marginBottom: moderateScale(30),
  },
});
