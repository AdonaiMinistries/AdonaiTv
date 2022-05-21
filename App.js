import React, {component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailsScreen';
import VideoScreen from './src/screens/VideoScreen';
import {SermonsProvider} from './src/provider/SermonsProvider';
import {AppConfigProvider} from './src/provider/AppConfigProvider';
import {StateProvider} from './src/provider/StateProvider';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailScreen,
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

const AppContainer = createAppContainer(navigator);

const App = () => {
  return (
    <StateProvider>
      <AppContainer />
    </StateProvider>
  );
};
// const App = () => {
//   return (
//     <StateProvider>
//       <SermonsProvider>
//         <AppConfigProvider>
//           <AppContainer />
//         </AppConfigProvider>
//       </SermonsProvider>
//     </StateProvider>
//   );
// };

export default App;
