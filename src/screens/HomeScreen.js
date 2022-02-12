import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, Button} from 'react-native';
import ModalComponent from '../components/ModalComponent';
import SermonsList from '../components/SermonsList';
import useSermons from '../hook/useSermons';

const HomeScreen = ({navigation}) => {
  const [sermonsList, nextPage, FetchSermons, loading, allLoaded, error] =
    useSermons(`/users/140653357/projects/4496867/videos`);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {}, []);

  const loadMoreResults = async () => {
    FetchSermons(nextPage);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex: 1}}>
          <Button
            title="Live"
            hasTVPreferredFocus={true}
            onPress={() => {
              console.log('Live button pressed');
              setModalVisible(true);
            }}
          />
          <SermonsList
            sermonsList={sermonsList}
            allLoaded={allLoaded}
            // onPress={uri => {
            //   navigation.navigate('Details', {id: uri});
            // }}
            loadMoreResults={() => loadMoreResults()}
          />
          <ModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            uri={`https://m-c18-j2apps.s.llnwi.net/hls/1604.JantaTV.in_480p/index.m3u8`}
            isLive={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'black',
  },
});

export default HomeScreen;
