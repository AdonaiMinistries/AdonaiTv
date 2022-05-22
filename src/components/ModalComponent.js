import React, {useState, useEffect, useCallback} from 'react';
import {
  Modal,
  Text,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import vimeo from '../api/vimeo';
import VideoComponent from './VideoComponent';

const getSermonVideoUrl = async (vidId, setUrl, setLoaded) => {
  vimeo
    .get(`https://player.vimeo.com/video/${vidId}/config`)
    .then(resp => {
      // setUrl(resp.data.request.files.progressive[3].url);
      // setUrl(resp.data.request.files.progressive[4].url);
      resp.data.request.files.progressive.find(e => {
        if (e.quality === '720p') {
          setUrl(e.url);
        }
      });
      setLoaded(true);
    })
    .catch(e => {
      console.error(e);
    });
};

const getLiveVideoUrl = async (setUrl, setLoaded, setShowVideo) => {
  console.log('Getting live video url.');
  vimeo
    .get(`https://www.adonaichurch.in/app-config.json`)
    .then(resp => {
      setLoaded(true);
      setUrl(resp.data.config.stream.link);
      setShowVideo(true);
    })
    .catch(e => console.error(e));
};

const getVideoIdFromUrl = url => {
  // "/videos/643139576"
  //         |<---id--->|
  const str = url.split('/');
  return str[str.length - 1];
};

const ModalComponent = props => {
  const [uri, setUri] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(
    useCallback(() => {
      // setLoaded(false);
      // setShowVideo(false);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}>
        {!loaded ? (
          <>
            <Text>This is MODAL SCREEN!!!!</Text>
            <Button
              title="Play Video"
              hasTVPreferredFocus={true}
              onPress={() => {
                if (props.isLive === false) {
                  getSermonVideoUrl(
                    getVideoIdFromUrl(props.uri),
                    setUri,
                    setLoaded,
                  );
                  setShowVideo(true);
                } else {
                  getLiveVideoUrl(setUri, setLoaded, setShowVideo);
                }
              }}
            />
          </>
        ) : null}
        {showVideo ? (
          loaded ? (
            <VideoComponent
              uri={`${uri}`}
              onExit={() => {
                setLoaded(false);
                showVideo(false);
              }}
            />
          ) : (
            <ActivityIndicator color={'red'} />
          )
        ) : null}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
});

export default ModalComponent;
