import React, {useContext} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {
  CONFIG_LOADED,
  CONFIG_LOADING,
  INIT_STATE,
  SERMONS_LOADED,
} from '../actions/state/type';
import {FetchAppConfig} from '../api/appconfig-fetch';
import {FetchSermons} from '../api/sermons-fetch';
import HomeScreenContent from '../components/homeScreenContent';
import {StateContext} from '../provider/StateProvider';

const HomeScreen = props => {
  const ctx = useContext(StateContext);

  const renderActivityIndicator = () => {
    return (
      <ActivityIndicator
        color="red"
        size={'large'}
        style={styles.activityIndicator}
      />
    );
  };

  const navigateToDetailsScreen = uri => {
    props.navigation.navigate('Details', {id: uri});
  };

  // <ImageBackground
  //   source={image_const.backgroundImage}
  //   style={styles.backgroundImage}>
  //   {/* Logo */}
  //   <View style={styles.logoContainer}>
  //     <Image source={image_const.whiteLogo} style={styles.logo} />
  //   </View>
  //   {/* Live button. */}
  //   <LiveButton />
  // </ImageBackground>

  return (
    <View style={styles.container}>
      {(() => {
        switch (ctx.state.currentState) {
          case INIT_STATE:
          case CONFIG_LOADING:
            if (ctx.state.currentState === INIT_STATE) {
              FetchAppConfig(ctx);
            }
            return renderActivityIndicator();
          case CONFIG_LOADED:
            FetchSermons(ctx);
            return renderActivityIndicator();

          case SERMONS_LOADED:
            return (
              <View style={{height: '100%', width: '100%'}}>
                <HomeScreenContent
                  sermonsList={ctx.state.sermons.list}
                  navigateToDetailsScreen={navigateToDetailsScreen}
                  navigation={props.navigation}
                />
              </View>
            );
        }
      })()}
    </View>
  );
};

// const getFromBackEnd = () => {
//   const [fetched, setFetched] = useState(false);
//   const [error, setError] = useState(null);
//   const [response, setResponse] = useState(null);

//   const FetchBackEnd = async () => {
//     fetch(http_constants.appConfigUrl)
//       .then(r => r.json())
//       .then(r => {
//         console.log('Recv from backend.');
//         setResponse(r);
//         setFetched(true);
//       })
//       .catch(e => {
//         console.error(e);
//         setError(e);
//         setFetched(false);
//       });
//   };

//   return [FetchBackEnd, response, error];
// };

// const FetchBackEndWrap = async () => {
//   var rsp, fetched, error;

//   try {
//     let r = await fetch(http_constants.appConfigUrl);
//     r.json().then(r => {
//       rsp = r;
//     });
//   } catch (e) {
//     console.error(e);
//   }

//   return rsp, fetched, error;
// };

// const getAppCfg = () => {
//   const [fetched, setFetched] = useState(false);
//   const [error, setError] = useState(null);

//   // Get backend api's hook.
//   const [FetchBackEnd, backEndRsp, backEndErr] = getFromBackEnd();

//   useEffect(() => {
//     FetchAppCfg();

//     return () => {};
//   }, []);

//   const FetchAppCfg = async () => {
//     // Get cfg from back-end.
//     console.log('Getting cfg from backend.');

//     var r = await FetchBackEndWrap();

//     console.log(` Backend reply- ${r}`);
//   };
//   return [FetchAppCfg, fetched, error];
// };

// const HomeScreen = props => {
//   const [setAppState, setError, getCurrentState] = useAppState();
//   const [setAppConfig, getAppConfig] = useAppConfigNew();
//   const [setSermons, setNextPage, getSermons, getNextpage] = useSermonsNew();

//   const renderActivityIndicator = () => {
//     if (
//       getCurrentState() === INIT_STATE ||
//       getCurrentState() === CONFIG_LOADING
//     ) {
//       <ActivityIndicator
//         color="red"
//         size={'large'}
//         style={styles.activityIndicator}
//       />;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {(() => {
//         /* Show loading sign when data is being fetched from backend. */
//         console.log(getCurrentState());

//         if (getCurrentState() === INIT_STATE) {
//           FetchAppConfig();
//         }

//         if (getCurrentState() === CONFIG_LOADED) {
//           /* Fetch sermons. */
//           FetchSermons(getAppConfig());
//           return <Text style={{color: 'white'}}> HOME SCREEN </Text>;
//         }

//         return renderActivityIndicator();
//       })()}
//     </View>
//   );
// };

// const HomeScreen_old = props => {
//   const [FetchAppCfg, appCfgfetched, appCfgerr] = getAppCfg();
//   const [FetchSermons, sermonLoading, errorSermon] = useSermons();

//   const sermonsContext = useContext(SermonsContext);

//   useEffect(() => {
//     FetchAppCfg();
//     return () => {};
//   }, []);

//   return (
//     <View style={styles.container}>
//       {(() => {
//         // if (!configFetched || sermonLoading) {
//         if (!appCfgfetched) {
//           return <ActivityIndicator color="red" />;
//         } else {
//           return (
//             <View
//               style={{
//                 width: '100%',
//                 height: '100%',
//               }}>
//               {/*
//                   1. Render background image
//                   2. Render church logo
//                   3. Live button
//                   4. Render Sermons Text and divider
//                   5. Render Sermons List.
//                */}
// <ImageBackground
//   source={image_const.backgroundImage}
//   style={styles.backgroundImage}>
//   {/* Logo */}
//   <View style={styles.logoContainer}>
//     <Image source={image_const.whiteLogo} style={styles.logo} />
//   </View>
//   {/* Live button. */}
//   <LiveButton />
// </ImageBackground>
//             </View>
//           );
//         }
//       })()}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
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

// const HomeScreen = ({navigation}) => {
//   const [sermonsList, nextPage, FetchSermons, loading, allLoaded, error] =
//     useSermons(`/users/140653357/projects/4496867/videos`);
//   const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {}, []);

//   const loadMoreResults = async () => {
//     FetchSermons(nextPage);
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator />
//       ) : (
//         <View style={{flex: 1}}>
//           <Button
//             title="Live"
//             hasTVPreferredFocus={true}
//             onPress={() => {
//               console.log('Live button pressed');
//               setModalVisible(true);
//             }}
//           />
//           <SermonsList
//             sermonsList={sermonsList}
//             allLoaded={allLoaded}
//             // onPress={uri => {
//             //   navigation.navigate('Details', {id: uri});
//             // }}
//             loadMoreResults={() => loadMoreResults()}
//           />
//           <ModalComponent
//             modalVisible={modalVisible}
//             setModalVisible={setModalVisible}
//             uri={`https://m-c18-j2apps.s.llnwi.net/hls/1604.JantaTV.in_480p/index.m3u8`}
//             isLive={true}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

export default HomeScreen;
