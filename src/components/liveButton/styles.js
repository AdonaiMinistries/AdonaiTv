import {StyleSheet} from 'react-native';
import color_const from '../../constants/colorConst';

export default styles = StyleSheet.create({
  container: {
    // paddingVertical: '10%',
    // position: 'absolute',
    // top: '33%',
    width: 150,
    height: 40,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: color_const.adonaiRed,
  },
  button: {
    margin: 2,
  },
  liveText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Gotham-Regular',
  },
});
