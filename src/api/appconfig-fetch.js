import React, {useContext} from 'react';
import {CONFIG_LOADED, CONFIG_LOADING} from '../actions/state/type';
import {http_constants} from '../constants/httpConst';

const FetchFromBackend = async () => {
  let rsp = null;

  try {
    rsp = await fetch(http_constants.appConfigUrl);
    return rsp.json();
  } catch (error) {
    console.log(error);
    return _, error;
  }
};

const FetchAppConfig = ctx => {
  FetchFromBackend()
    .then((rsp, err) => {
      if (err) {
        /* Update state as error with reason. */
        ctx.dispatch({
          type: 'UpdateErrorState',
          state: CONFIG_LOAD_FAILED,
          error: err,
        });
        return;
      }

      /* Update appconfig in ctx */
      ctx.dispatch({
        type: 'AddAppConfig',
        appconfig: rsp,
      });
      /* Update state as CONFIG_LOADED */
      ctx.dispatch({
        type: 'UpdateState',
        state: CONFIG_LOADED,
      });
    })
    .catch(err => {
      console.error(err);
      ctx.dispatch({
        type: 'UpdateErrorState',
        state: CONFIG_LOAD_FAILED,
        error: err,
      });
    });
};
// const FetchAppConfig = () => {
//   const [setAppConfig, getAppConfig] = useAppConfigNew();
//   const [setAppState, setError, getCurrentState] = useAppState();

//   FetchFromBackend().then((rsp, err) => {
//     if (err) {
//       /* Update state as error with reason. */
//       setError(err);
//       return;
//     }

//     /* Update appconfig in ctx */
//     setAppConfig({
//       token: rsp.config.token,
//       liveStream: rsp.config.stream.link,
//       nextStreamDate: rsp.config.stream.nextStream,
//     });

//     /* Update App state */
//     setAppState(CONFIG_LOADED);
//   });
// };

export {FetchAppConfig};
