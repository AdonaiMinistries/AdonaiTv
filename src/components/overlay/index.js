import React, {useContext, useEffect} from 'react';
import {BackHandler, Modal, Text, View} from 'react-native';
import VideoComponent from '../VideoComponent';
import {StateContext} from '../../provider/StateProvider';

const Overlay = props => {
  const ctx = useContext(StateContext);

  function onExit() {
    props.setOverlay(false);
  }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={() => {
          onExit();
        }}>
        <VideoComponent
          live={true}
          uri={`${ctx.state.appconfig.config.stream.link}`}
          onExit={onExit}
        />
      </Modal>
    </View>
  );
};

export default Overlay;
