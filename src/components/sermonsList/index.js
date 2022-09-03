import React from 'react';
import {FlatList, View} from 'react-native';
import SermonItem from '../sermonItem';
import styles from './styles';

// const SermonsList = props => {
//   const flatListRef = React.useRef();

//   function getData() {
//     var data = [];
//     props.sermonsList.forEach(i => data.push(i));
//     return data;
//   }
//   function renderItem(item) {
//     const flatListItem = item.item;
//     const key = 'flatlist_item_' + flatListItem.index;

//     const img = item.pictures.sizes.find(e => {
//       if (e.width === 640) {
//         return e;
//       }
//     });
//     return (
//       <FocusableHighlight
//         onPress={() => {}}
//         onFocus={e => {
//           // onItemFocus(e, item);
//         }}
//         underlayColor={styles.buttonFocusedColor}
//         style={styles.rowItem}
//         nativeID={key}
//         key={key}>
//         <Text style={styles.text}>{flatListItem.index}</Text>
//       </FocusableHighlight>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={getData()}
//         renderItem={renderItem}
//         keyExtractor={video => `${video.name + video.uri}`}
//       />
//     </View>
//   );
// };

const SermonsList = props => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [currentSermon, setCurrentSermon] = useState([]);
  const {sermonsList, navigateToDetailsScreen} = props;
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
                navigateToDetailsScreen(item.uri);
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
