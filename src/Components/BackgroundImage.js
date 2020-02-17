import React from 'react';
import {ImageBackground, StyleSheet, ViewPropTypes} from 'react-native';

const BackgroundImage = props => {
  return (
    <ImageBackground
      style={[StyleSheet.absoluteFill, props.container]}
      source={props.source}>
      {props.children}
    </ImageBackground>
  );
};

export default BackgroundImage;

BackgroundImage.propTypes = {
  container: ViewPropTypes.style,
};

BackgroundImage.defaultProps = {
  container: {},
};
