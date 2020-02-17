import React from 'react';
import PropTypes from 'prop-types';
import {Colors} from '../Theme/Colors';
import {SafeAreaView, StyleSheet} from 'react-native';
import ApplicationStyles from '../Theme/ApplicationStyles';

const ContainerWrapper = props => {
  return (
    <SafeAreaView style={[styles.mainContainer, props.container]}>
      {props.children}
    </SafeAreaView>
  );
};

export default ContainerWrapper;

ContainerWrapper.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

ContainerWrapper.defaultProps = {
  backgroundColor: Colors.background,
};

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
});
