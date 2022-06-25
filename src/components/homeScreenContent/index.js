import React, {useState} from 'react';
import styles from './styles';
import {image_const} from './../../constants/imageConst';
import {Image, ImageBackground, Text, View} from 'react-native';
import LiveButton from '../liveButton';
import SermonsList from '../sermonsList';
import Overlay from '../overlay';

function HomeScreenContent(props) {
  const [overlay, setOverlay] = useState(false);
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
          <LiveButton setOverlay={setOverlay} />
          {overlay && <Overlay setOverlay={setOverlay} />}
          {/* Sermons list is disabled. */}
          {/* <View style={styles.sermonsContainer}>
            <View style={{paddingHorizontal: '3%'}}>
              <Text style={styles.sermonText}>SERMONS</Text>
            </View>
            <View style={styles.divider} />
          </View>
          <SermonsList
            sermonsList={sermonsList}
            navigateToDetailsScreen={navigateToDetailsScreen}
          /> */}
        </View>
      </ImageBackground>
    </>
  );
}

export default HomeScreenContent;
