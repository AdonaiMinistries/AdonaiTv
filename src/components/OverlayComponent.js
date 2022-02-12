import React from 'react';
import {useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';

const OverlayComponent = props => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <Button
        title="play_pause"
        hasTVPreferredFocus={true}
        onPress={() => {
          props.setPause();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'green',
    opacity: 0.5,
  },
});

export default OverlayComponent;
