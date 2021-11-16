import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

const SermonsList = ({sermonsList, allLoaded, loadMoreResults, onPress}) => {
  return (
    <FlatList
      nestedScrollEnabled={true}
      data={sermonsList}
      numColumns={4}
      keyExtractor={video => `${video.name + video.uri}`}
      scrollEventThrottle={350}
      onEndReached={info => {
        if (allLoaded === false) {
          loadMoreResults();
        }
      }}
      onEndReachedThreshold={0.3}
      renderItem={({item}) => {
        const img = item.pictures.sizes.find(e => {
          if (e.width === 640) {
            return e;
          }
        });
        return (
          <TouchableHighlight
            onPress={() => onPress(item.uri)}
            style={{margin: 10}}>
            <View style={styles.videoContainer}>
              <Image
                style={styles.focusedImage}
                style={styles.image}
                source={{uri: `${img.link_with_play_button}`}}
              />
            </View>
          </TouchableHighlight>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width / 5,
    margin: 10,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
  },
});

export default SermonsList;
