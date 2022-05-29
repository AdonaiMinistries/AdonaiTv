import React from 'react';
import styles from './styles';
import {image_const} from './../../constants/imageConst';
import {Image, ImageBackground, Text, View} from 'react-native';
import LiveButton from '../liveButton';
import SermonsList from '../sermonsList';

function HomeScreenContent(props) {
  const {sermonsList, navigateToDetailsScreen, navigation} = props;
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
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '17%',
          }}>
          <LiveButton />
          <View style={styles.sermonsContainer}>
            <View style={{paddingHorizontal: '3%'}}>
              <Text style={styles.sermonText}>SERMONS</Text>
            </View>
            <View style={styles.divider} />
          </View>
          <SermonsList
            sermonsList={sermonsList}
            navigateToDetailsScreen={navigateToDetailsScreen}
          />
        </View>
      </ImageBackground>
    </>
  );
}

export default HomeScreenContent;
