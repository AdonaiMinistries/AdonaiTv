import {Dimensions, StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  videoContainer: {
    height: Dimensions.get('window').height / 4.5,
    width: Dimensions.get('window').width / 4.5,
    opacity: 0.5,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
  },
});
