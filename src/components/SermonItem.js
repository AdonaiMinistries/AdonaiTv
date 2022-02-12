import React, {useState} from 'react';
import {forwardRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

const SermonItem = forwardRef((props, ref) => {
  const [focused, setFocused] = useState(false);
  return (
    <TouchableHighlight
      underlayColor="trasparent"
      ref={ref}
      onPress={event => {
        if (event.eventKeyAction === 0) {
          props.onPress(props.data);
        }
      }}
      onFocus={() => {
        console.log(`flat_list_item_` + `${props.data.uri}`);
        if (ref !== null) {
          ref.current.focus();
        }
        setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
      }}
      style={{margin: 10}}>
      <View
        style={[
          styles.videoContainer,
          focused ? {borderWidth: 2, opacity: 1} : null,
        ]}>
        <Image style={styles.image} source={{uri: props.image}} />
      </View>
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  videoContainer: {
    height: Dimensions.get('window').height / 4.5,
    width: Dimensions.get('window').width / 4.5,
    opacity: 0.5,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
  },
});

export default SermonItem;
