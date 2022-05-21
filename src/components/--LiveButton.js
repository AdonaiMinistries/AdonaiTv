import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {color_const} from '../constants/colorConst';

const LiveButton = props => {
  const [liveFocus, setLiveFocus] = useState(false);

  return (
    <View
      style={[
        styles.liveButton,
        liveFocus ? {backgroundColor: 'white'} : null,
      ]}>
      <TouchableHighlight
        onFocus={() => {
          console.log('Live button focus');
          setLiveFocus(true);
        }}
        onBlur={() => setLiveFocus(false)}>
        <Text
          style={[
            styles.liveText,
            liveFocus ? {color: color_const.adonaiRed} : null,
          ]}>
          LIVE
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  liveButton: {
    paddingVertical: '10%',
    position: 'absolute',
    alignItems: 'center',
    top: '45%',
    width: '12%',
    borderRadius: 12,
    backgroundColor: color_const.adonaiRed,
  },
  liveText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gotham-Regular',
  },
});

export default LiveButton;
