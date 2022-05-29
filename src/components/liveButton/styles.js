import {StyleSheet} from 'react-native';
import color_const from '../../constants/colorConst';

export default styles = StyleSheet.create({
  liveButton: {
    // paddingVertical: '10%',
    position: 'absolute',
    alignItems: 'center',
    top: '33%',
    width: '12%',
    borderRadius: 12,
    backgroundColor: color_const.adonaiRed,
  },
  liveText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gotham-Regular',
  },
});
