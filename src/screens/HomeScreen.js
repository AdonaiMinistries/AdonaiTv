import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import SermonsList from '../components/SermonsList';
import useSermons from '../hook/useSermons';

const HomeScreen = ({navigation}) => {
  const [sermonsList, nextPage, FetchSermons, loading, allLoaded, error] =
    useSermons(`/users/140653357/projects/4496867/videos`);

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
          <SermonsList
            sermonsList={sermonsList}
            allLoaded={allLoaded}
            navigation={navigation}
            loadMoreResults={() => loadMoreResults()}
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
