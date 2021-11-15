import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import VideoScreen from './src/screens/VideoScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Video: VideoScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: () => {
        false;
      },
    },
  },
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
