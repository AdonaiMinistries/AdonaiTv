import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import FocusableHighlight from './../utils/focusable/FocusableHighlight';
import Style from '../styles/Style';

const SermonsList = ({sermonsList, allLoaded, loadMoreResults, onPress}) => {
  return (
    <FlatList
      underlayColor={'black'}
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
        let key = 'flat_list_item_' + item.uri;
        return (
          <FocusableHighlight
            onPress={() => onPress(item.uri)}
            style={{margin: 10}}
            nativeID={key}
            key={key}>
            <View style={styles.videoContainer}>
              <Image
                style={styles.image}
                source={{uri: `${img.link_with_play_button}`}}
              />
            </View>
          </FocusableHighlight>
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
