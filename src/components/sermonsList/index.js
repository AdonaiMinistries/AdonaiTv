import React from 'react';
import {FlatList, View} from 'react-native';
import SermonItem from '../sermonItem';

const SermonsList = props => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [currentSermon, setCurrentSermon] = useState([]);
  const {sermonsList} = props;
  console.log('Sermons List ...');
  var tmpList = [];
  sermonsList.forEach(i => tmpList.push(i));
  return (
    <View>
      <FlatList
        nestedScrollEnabled={true}
        data={tmpList}
        numColumns={4}
        keyExtractor={video => `${video.name + video.uri}`}
        scrollEventThrottle={350}
        // onEndReached={() => {
        //   if (allLoaded === false) {
        //     loadMoreResults();
        //   }
        // }}
        onEndReachedThreshold={0.3}
        renderItem={({item, index}) => {
          const img = item.pictures.sizes.find(e => {
            if (e.width === 640) {
              return e;
            }
          });
          return (
            <SermonItem
              onPress={sermon => {
                // setModalVisible(true);
                // setCurrentSermon(sermon);
              }}
              data={item}
              image={`${img.link_with_play_button}`}
            />
          );
        }}
      />
      {/* <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        uri={currentSermon.uri}
        isLive={false}
      /> */}
    </View>
  );
};

export default SermonsList;
