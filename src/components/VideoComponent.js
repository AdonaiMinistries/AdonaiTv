import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TVEventHandler,
  View,
} from 'react-native';
import Video from 'react-native-video';
import OverlayComponent from './OverlayComponent';
import shaka from 'shaka-player';

const VideoComponent = props => {
  const playerRef = useRef(null);
  const [paused, setPause] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    // Listen to TV events
    const tvEventHandler = new TVEventHandler();
    tvEventHandler.enable(this, tvEventListener);
    console.log('TV event handler is enabled');

    setOverlay(false);

    return () => {
      console.log('cleanup called.');
      if (tvEventHandler) {
        tvEventHandler.disable();
      }
      if (props.onExit) {
        props.onExit();
      }
    };
  }, []);

  function tvEventListener(component, event) {
    console.log('Button pressed ' + event.eventType);
    console.log(event.eventKeyAction);
    if (event.eventKeyAction === 0) {
      setOverlay(!overlay);
      if (event.eventType === 'focus' || event.eventType === 'select') {
        // Toggle play.
        setPause(!paused);
      }
    }
  }

  return (
    <View style={{height: '100%', width: '100%'}}>
      <TouchableHighlight
        style={{height: '100%', width: '100%'}}
        hasTVPreferredFocus={true}>
        <>
          <Video
            ref={playerRef}
            source={{uri: props.uri}}
            style={styles.video}
            fullscreen={true}
            // controls={true}
            hasTVPreferredFocus={true}
            paused={paused}
            resizeMode="cover"
          />

          {overlay ? (
            <OverlayComponent
              overlay
              paused
              setPause={() => {
                setPause(!paused);
                console.log(playerRef.current);
                if (playerRef.current.paused) {
                  setOverlay(true);
                } else {
                  setOverlay(false);
                }
              }}
              setOverlay={() => {
                setOverlay(!overlay);
              }}
            />
          ) : null}
        </>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default VideoComponent;
