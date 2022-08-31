import React, {useContext} from 'react';
import {
  CONFIG_LOADED,
  CONFIG_LOADING,
  CONFIG_LOAD_FAILED,
} from '../actions/state/type';
import {http_constants} from '../constants/httpConst';

const FetchFromBackend = async ctx => {
  try {
    let rsp = await fetch(http_constants.appConfigUrl);
    j = await rsp.json();
    return j;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const FetchAppConfig = async ctx => {
  FetchFromBackend(ctx)
    .then(rsp => {
      /* Update appconfig in ctx */
      if (rsp === undefined) {
        return;
      }
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
    .catch(e => {
      console.error(e);
      /* Set error state. */
      ctx.dispatch({
        type: 'UpdateErrorState',
        state: CONFIG_LOAD_FAILED,
        error: e,
      });
    });
};

export {FetchAppConfig};
