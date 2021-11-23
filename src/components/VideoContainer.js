import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import Video from 'react-native-video';

const VideoContainer = forwardRef((props, ref) => {
  const {
    source,
    paused,
    onReadyForDisplay,
    onLoadStart,
    onLoad,
    onPlaybackRateChange,
    onProgress,
    onSeek,
    onEnd,
    onError,
  } = props;

  return (
    <Video
      ref={ref}
      source={{
        uri: source,
      }}
      paused={paused}
      onReadyForDisplay={onReadyForDisplay}
      onLoadStart={onLoadStart}
      onLoad={onLoad}
      onPlaybackRateChange={onPlaybackRateChange}
      onProgress={onProgress}
      onSeek={onSeek}
      onEnd={onEnd}
      onError={onError}
      disableFocus={true}
      resizeMode={'cover'}
      style={styles.video}
      onFullScreen={true}
    />
  );
});

export default VideoContainer;

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
