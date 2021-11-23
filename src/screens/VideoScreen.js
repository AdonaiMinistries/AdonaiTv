import React, {useEffect, useState, useRef} from 'react';
import {Text, StyleSheet, View, TVEventHandler, Platform} from 'react-native';
import VideoContainer from '../components/VideoContainer';
import vimeo from './../api/vimeo';
import useStateRef from '../hook/useStateRef';
import Style from './../styles/Style';
import FocusableHighlight from '../utils/focusable/FocusableHighlight';
import VideoProgressBar from './../components/VideoProgressBar';

const getSermonVideoUrl = (vidId, setUrl) => {
  vimeo
    .get(`https://player.vimeo.com/video/${vidId}/config`)
    .then(resp => {
      // setUrl(resp.data.request.files.progressive[3].url);
      setUrl(resp.data.request.files.hls.cdns.akfire_interconnect_quic.url);
    })
    .catch(e => console.error(e));
};

const getVideoIdFromUrl = url => {
  // "/videos/643139576"
  //         |<---id--->|
  const str = url.split('/');
  return str[str.length - 1];
};

function formatTime(time) {
  let seconds = parseInt(time, 10);
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  let timeFormat = '';
  if (hours > 0) {
    if (hours < 10) {
      hours = '0' + hours;
    }
    timeFormat += hours + ':';
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  // Fix NaN
  if (isNaN(minutes)) {
    minutes = '-';
  }
  if (isNaN(seconds)) {
    seconds = '-';
  }
  timeFormat += minutes + ':' + seconds;
  return timeFormat;
}

const VideoScreen = ({navigation}) => {
  let hideOverlayTimer = null;
  const [src, setSrc] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const playerRef = useRef(null);
  const playPauseButtonRef = useRef(null);

  // State Refs
  // Play/Pause state of player.
  const [pausedRef, isPaused, setPaused] = useStateRef(false);
  const [overlayRef, isOverlayVisible, setIsOverlayVisible] = useStateRef(true);

  useEffect(() => {
    // Fetch url
    getSermonVideoUrl(getVideoIdFromUrl(navigation.getParam('id')), url => {
      setSrc(url);
    });

    const tvEventHandler = new TVEventHandler();
    tvEventHandler.enable(null, tvEventListener);
    // Clean up
    return () => {
      // Pause playback
      if (!isPaused()) {
        setPaused(true);
      }
      // Clean timeout
      if (hideOverlayTimer) {
        clearTimeout(hideOverlayTimer);
      }
      // Remove TV event listener
      if (tvEventHandler) {
        tvEventHandler.disable();
      }
    };
  }, []);

  const onLoadStart = () => setLoading(true);
  const onLoad = data => {
    // Returns the total duration of the video.
    setVideoDuration(data.duration);
    setLoading(false);
  };
  function onProgress(data) {
    setVideoTime(data.currentTime);
  }

  function onEnd() {
    setVideoTime(0);
    setPaused(true);
  }

  function setOverlayVisible() {
    if (isOverlayVisible() === false) {
      setIsOverlayVisible(true);
      if (playPauseButtonRef) {
        playPauseButtonRef.current.focus();
      }
    }
    setOverlayHiddenAfterDelay();
  }

  function setOverlayHidden() {
    if (isOverlayVisible() === true && !isPaused()) {
      setIsOverlayVisible(false);
    }
  }

  function setOverlayHiddenAfterDelay() {
    if (hideOverlayTimer) {
      clearTimeout(hideOverlayTimer);
    }
    hideOverlayTimer = setTimeout(setOverlayHidden, 4000);
  }

  function tvEventListener(component, event) {
    if (event.eventKeyAction === 0) {
      // Show overlay
      setOverlayVisible();
      // Toggle play / pause
      if (event.eventType === 'playPause') {
        setPaused(!isPaused());
      }
    }
  }

  // Call video container which will render the video.
  return (
    <View
      style={{
        flex: 1,
      }}>
      <VideoContainer
        ref={playerRef}
        source={src}
        paused={isPaused()}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onProgress={onProgress}
        onEnd={onEnd}
        onError={() => {
          console.error('Error occured in playing the video');
        }}
      />
      <View
        style={
          isOverlayVisible()
            ? styles.videoOverlayVisible
            : styles.videoOverlayHidden
        }>
        <View style={styles.videoOverlayBackground} />
        <View style={styles.videoControls}>
          <FocusableHighlight
            nativeID={'play_pause_button'}
            ref={playPauseButtonRef}
            onPress={e => {
              if (e.eventKeyAction === 0 && e.eventType === 'select') {
                setPaused(!isPaused());
              }
            }}
            style={styles.videoControl}
            hasTVPreferredFocus={true}
            underlayColor={Style.buttonFocusedColor}>
            <Text style={styles.videoControlText}>
              {isPaused() ? 'Play' : 'Pause'}
            </Text>
          </FocusableHighlight>
          <View style={styles.videoTime}>
            <Text style={styles.videoTimeText}>
              {formatTime(videoTime) + ' / ' + formatTime(videoDuration)}
            </Text>
          </View>
        </View>
        <VideoProgressBar
          duration={videoDuration}
          time={videoTime}
          style={styles.progressBar}
          seek={seconds => {
            playerRef.current.seek(seconds);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  videoOverlayVisible: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoOverlayHidden: {
    opacity: 0.0,
  },
  videoOverlayBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  progressBar: {
    position: 'absolute',
    bottom: Style.px(135),
    width: '96%',
    marginLeft: '2%',
  },
  videoControls: {
    position: 'absolute',
    width: '100%',
    height: Style.px(140),
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  videoControl: {
    width: Style.px(300),
    height: Style.px(100),
    margin: Style.px(20),
    backgroundColor: Style.buttonUnfocusedColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoControlText: {
    fontSize: Style.px(30),
  },
  videoTime: {
    flex: 1,
    //width: Style.px(200),
    height: Style.px(100),
    margin: Style.px(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTimeText: {
    fontSize: Style.px(20),
    color: 'white',
  },
});

export default VideoScreen;
