import React, {useState} from 'react';
import {Button, Text, TouchableHighlight, View} from 'react-native';

function DetailsScreen({navigation}) {
  const [focused, setFocus] = useState(false);

  return (
    <View
      style={{
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Text>Video Details Screen!!!</Text>
      <Button
        title="Play Button"
        hasTVPreferredFocus={true}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onPress={event => {
          if (
            event.eventKeyAction !== undefined &&
            parseInt(event.eventKeyAction) === 0
          ) {
            navigation.navigate('Video', {id: navigation.getParam('id')});
          }
        }}
      />
      {/* <TouchableHighlight
        style={{}}
        onFocus={() => {
          console.log('Play Button Focused');
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onPress={event => {
          if (
            event.eventKeyAction !== undefined &&
            parseInt(event.eventKeyAction) === 0
          ) {
            navigation.navigate('Video', {id: navigation.getParam('id')});
          }
        }}
        hasTVPreferredFocus={true}>
        <Text
          style={[
            {color: 'black'},
            focused ? {color: 'white'} : {color: 'black'},
          ]}>
          Play Video
        </Text>
      </TouchableHighlight> */}
    </View>
  );
}

export default DetailsScreen;
