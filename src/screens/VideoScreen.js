import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import vimeo from './../api/vimeo';
import Video from 'react-native-video';

const VideoScreen = ({navigation}) => {
  const [loading, setloading] = useState(true);
  const [url, seturl] = useState('');
  useEffect(() => {
    const str = navigation.getParam('id').split('/');
    const vidId = str[str.length - 1];
    vimeo
      .get(`https://player.vimeo.com/video/${vidId}/config`)
      .then(resp => {
        setloading(false);
        seturl(resp.data.request.files.progressive[3].url);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Video
          fullscreen={true}
          controls={true}
          style={{height: '100%', width: '100%'}}
          source={{uri: `${url}`}} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default VideoScreen;
