import React from 'react';
import styles from './styles';
import {image_const} from './../../constants/imageConst';
import {Image, ImageBackground, Text, View} from 'react-native';
import LiveButton from '../liveButton';
import SermonsList from '../sermonsList';

function HomeScreenContent(props) {
  const {sermonsList} = props;
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
        <View style={{flexDirection: 'column'}}>
          <LiveButton />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 30, color: 'white'}}>SERMONS</Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'white',
                fontFamily: 'Gotham-Regular',
              }}
            />
          </View>
          <SermonsList sermonsList={sermonsList} />
        </View>
      </ImageBackground>
    </>
  );
}

export default HomeScreenContent;
