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
          // uri="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
          uri={`${ctx.state.appconfig.config.stream.link}`}
          onExit={onExit}
        />
      </Modal>
    </View>
  );
};

export default Overlay;
