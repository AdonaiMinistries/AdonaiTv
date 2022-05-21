import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  logoContainer: {
    alignSelf: 'flex-start',
    aspectRatio: 3 / 2,
    width: '18%',
    height: '18%',
    paddingRight: 70,
  },
  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
