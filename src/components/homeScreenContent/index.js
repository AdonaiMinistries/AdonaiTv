import React from 'react';
import styles from './styles';
import {image_const} from './../../constants/imageConst';
import {Image, ImageBackground, Text, View} from 'react-native';
import LiveButton from '../liveButton';

function HomeScreenContent(props) {
  return (
    <>
      <ImageBackground
        source={image_const.backgroundImage}
        style={styles.backgroundImage}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={image_const.whiteLogo} style={styles.logo} />
        </View>
        {/* Live button */}
        <LiveButton />
      </ImageBackground>
    </>
  );
}

HomeScreenContent.propTypes = {};

export default HomeScreenContent;
