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
  sermonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sermonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Gotham-Regular',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
