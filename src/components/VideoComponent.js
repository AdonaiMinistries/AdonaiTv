import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
  Animated,
  TVEventHandler,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from 'react-native-progress/Bar';

const SEEK_STEP = 5; // 5 seconds.

const VideoComponent = props => {
  const playerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [overLay, setOverlLay] = useState(true);
  const [loading, setLoading] = useState(true);
  const animated = useRef(new Animated.Value(0)).current;
  const r_text = useRef(new Animated.Value(0)).current;

  let hideTimeOut = null;
  const {width} = Dimensions.get('screen');

  const _enableTvEventHandler = (cmp, event) => {
    if (event && event.eventType) {
      console.log('Event pressed ' + event.eventType);
    }
  };

  useEffect(() => {
    console.log('Video componenet - entered.');
    const _tvEventHandler = new TVEventHandler();
    _tvEventHandler.enable(this, _enableTvEventHandler);

    return () => {
      console.log('Exiting the video component');
      if (_tvEventHandler) {
        _tvEventHandler.disable();
      }
    };
  }, []);

  useEffect(() => {
    /* Added to animate in loop. */
    if (props.live) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(r_text, {toValue: 1, useNativeDriver: true}),
          Animated.timing(r_text, {toValue: 0, useNativeDriver: true}),
        ]),
      ).start();
    }
    return () => {};
  }, []);

  const toTime = seconds => {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
  };

  const onLoad = meta => {
    // Get the total video time.
    console.log('onLoad');
    setDuration(meta.duration);
    setOverlLay(true);
    setLoading(false);
  };
  const onLoadStart = meta => {
    // Get the total video time.
    console.log('onLoadStart');
    setLoading(true);
  };

  const onProgress = progress => {
    // Setting current duration.
    setProgress(progress.currentTime / duration);
  };

  const onEnd = () => {
    console.log('onExit');
    setPaused(true);
    props.onExit();
  };

  const handlePlayPauseButton = () => {
    triggerShowHide();
    if (progress >= 1) {
      // Video has reached end of the video
      // need to start the video again.
      playerRef.current.seek(0);
    }
    setPaused(!paused);
  };

  const handleSeek = seekStep => {
    triggerShowHide();

    const seekBy = Math.floor(progress * duration) + seekStep;

    switch (seekBy) {
      case seekBy < 0:
        playerRef.current.seek(0);
        break;

      case seekBy > duration:
        break;

      default:
        playerRef.current.seek(seekBy);
        break;
    }
  };

  const triggerShowHide = () => {
    clearTimeout(hideTimeOut);
    showOverlay();
    if (paused) {
      hideOverlay();
    }
  };

  const showOverlay = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const hideOverlay = () => {
    hideTimeOut = setTimeout(() => {
      Animated.timing(animated, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 15000);
  };

  const interpolatedControl = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const progressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        <Text style={{color: 'white', paddingRight: '1%'}}>
          {toTime(Math.floor(progress * duration))}
        </Text>
        <View>
          <ProgressBar
            progress={progress}
            color="red"
            unfilledColor="rgba(255, 255, 255, 0.5)"
            borderColor="#FFF"
            width={width * 0.9}
            height={width * 0.015}
          />
        </View>
      </View>
    );
  };

  function controllers() {
    return (
      <Animated.View style={[styles.controls, {opacity: interpolatedControl}]}>
        <TouchableHighlight
          style={{paddingHorizontal: '2%'}}
          onPress={() => handleSeek(-SEEK_STEP)}
          onFocus={() => {
            triggerShowHide();
            console.log('backward Focus');
          }}>
          <Icon name="backward" size={30} color="#FFF" />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            handlePlayPauseButton();
          }}
          onFocus={() => triggerShowHide()}
          style={{paddingHorizontal: '2%'}}>
          <Icon name={!paused ? 'pause' : 'play'} size={30} color="#FFF" />
        </TouchableHighlight>
        <TouchableHighlight
          style={{paddingHorizontal: '2%'}}
          onPress={() => handleSeek(SEEK_STEP)}
          onFocus={() => {
            triggerShowHide();
            console.log('Forward Focus');
          }}>
          <Icon name="forward" size={30} color="#FFF" />
        </TouchableHighlight>
      </Animated.View>
    );
  }

  function liveText() {
    return (
      <View style={[styles.liveTextContainer]}>
        {/* RED DOT */}
        <Animated.View
          style={[
            styles.redDot,
            {
              opacity: r_text,
            },
          ]}></Animated.View>
        <View style={{width: 2}}></View>
        <Text style={styles.liveText}>live</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View style={styles.loadingContainer}>
        {loading && <ActivityIndicator color={'red'} size="large" />}
      </View>
      <View style={{flex: 1, overflow: 'hidden'}}>
        <Video
          ref={playerRef}
          source={{uri: `${props.uri}`}}
          style={styles.video}
          fullscreen={true}
          paused={paused}
          resizeMode="cover"
          /* Call back additions */
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          onEnd={onEnd}
        />
        {props.live && !loading && liveText()}
        {!props.live && controllers()}
        {!props.live && progressBar()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  liveTextContainer: {
    position: 'absolute',
    top: '.5%',
    right: '1%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    backgroundColor: 'red',
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  liveText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Gotham-Regular',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: '25%',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default VideoComponent;
