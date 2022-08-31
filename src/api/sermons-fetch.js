import React from 'react';
import {SERMONS_LOADED} from '../actions/state/type';
import {http_constants} from '../constants/httpConst';

const FetchFromBackend = async (url, token) => {
  try {
    let r = await fetch(`${http_constants.vimeoBaseUrl}${url}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    j = await r.json();
    return j;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const FetchSermons = ctx => {
  FetchFromBackend(
    http_constants.vimeoProjectUrl,
    ctx.state.appconfig.config.token,
  )
    .then(rsp => {
      if (rsp && ctx.state.sermons.nextpage === rsp.paging.next) {
        return;
      }

      /* State variables update. */
      ctx.dispatch({
        type: 'AddSermons',
        next: rsp.paging.next /* Update next page. */,
        sermons: rsp.data /* Sermon data */,
      });

      ctx.dispatch({
        type: 'UpdateState',
        state: SERMONS_LOADED,
      });
    })
    .catch(e => {
      console.error(e);
    });
};

export {FetchSermons};

/**
 * Fetch sermons data from backend.
 * 1. Get token from www.adonaichurch.in
 * 2. Using token fetch sermons list from vimeo.
 */

// async function FetchSermonsNew(ctx) {
//   let appConfig = await getAppConfig();
// }

// async function getAppConfig() {
//   return new Promise(resolve => {
//     /** */
//     let rsp = null;
//     console.log('Fetching from vimeo ...');

//     try {
//       console.log(`${http_constants.vimeoBaseUrl}${url}`);
//       rsp = await fetch(`${http_constants.vimeoBaseUrl}${url}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return rsp.json();
//     } catch (error) {
//       console.log(error);
//       return null, error;
//     }
//   });
// }

// const FetchSermons = appCfg => {
//   const [setSermons, setNextPage, getSermons, getNextpage] = useSermonsNew();
//   const [setAppState, setError, getCurrentState] = useAppState();

//   FetchFromBackend(http_constants.vimeoProjectUrl, appCfg.token)
//     .then((rsp, err) => {
//       /**
//        * Set the sermons to the context.
//        * Set the current state.
//        */
//       setSermons(rsp, rsp.next);
//       setAppState(SERMONS_LOADED);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// };
