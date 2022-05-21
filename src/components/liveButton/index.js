import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import color_const from '../../constants/colorConst';
import styles from './styles.js';

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

export default LiveButton;
