import React from 'react';
import {useState} from 'react';
import {Button, FlatList, Modal, Text} from 'react-native';
import ModalComponent from './ModalComponent';
import SermonItem from './SermonItem';

const SermonsList = ({sermonsList, allLoaded, loadMoreResults, onPress}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSermon, setCurrentSermon] = useState([]);
  return (
    <>
      <FlatList
        nestedScrollEnabled={true}
        data={sermonsList}
        numColumns={4}
        keyExtractor={video => `${video.name + video.uri}`}
        scrollEventThrottle={350}
        onEndReached={() => {
          if (allLoaded === false) {
            loadMoreResults();
          }
        }}
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
                setModalVisible(true);
                setCurrentSermon(sermon);
              }}
              data={item}
              image={`${img.link_with_play_button}`}
            />
          );
        }}
      />
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        uri={currentSermon.uri}
        isLive={false}
      />
    </>
  );
};

export default SermonsList;
