import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import vimeo from './../api/vimeo';

const getSermonVideoUrl = (vidId, setUrl) => {
  vimeo
    .get(`https://player.vimeo.com/video/${vidId}/config`)
    .then(resp => {
      setUrl(resp.data.request.files.progressive[3].url);
    })
    .catch(e => {
      console.error(e);
    });
};

const getVideoIdFromUrl = url => {
  // "/videos/643139576"
  //         |<---id--->|
  const str = url.split('/');
  return str[str.length - 1];
};

const VideoScreen = props => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    // Fetch url
    getSermonVideoUrl(
      getVideoIdFromUrl(props.navigation.getParam('id')),
      url => {
        setSrc(url);
        console.log(url);
      },
    );
    return;
  }, []);

  return (
    <VideoPlayer
      source={{uri: src}}
      style={styles.video}
      resizeMode={'cover'}
      navigator={props.navigator}
      disableFullscreen={true}
      disableBack={true}
      disableVolume={true}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
  },
});

export default VideoScreen;
