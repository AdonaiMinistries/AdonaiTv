import React, {useState, useEffect, useContext} from 'react';
import {CONFIG_LOADED} from '../actions/state/type';
import {http_constants} from '../constants/httpConst';
import {AppConfigContext} from '../provider/AppConfigProvider';
import useFetch from './api/useFetch';
import useAppState from './useAppState';

/*
 ** Query 'https://www.adonaichurch.in/app-config.json'.
 ** Get the key and live stream link.
 ** Store it to global context variable.
 */

export default () => {
  const [FetchFromBackend, response, fetched, fetchError] = useFetch();
  const [appConfigError, setAppConfigError] = useState(null);
  const [appConfigFetched, setAppConfigFetched] = useState(false);

  const [setAppState, setError, getCurrentState] = useAppState();

  const appConfig = useContext(AppConfigContext);

  // useEffect(() => {
  //   FetchAppConfig();
  //   setAppConfigFetched(true);
  // }, []);

  const FetchAppConfig = () => {
    console.log('fetching from Appconfig');

    // let rsp,
    //   appConfigFetched,
    //   error = FetchFromBackend();

    FetchFromBackend().then(() => {
      if (response) {
        console.log('AppConfig response- ');
        console.log(response);
        setAppConfigFetched(true);
        setAppState(CONFIG_LOADED);
      }
    });

    // if (error != null) {
    //   console.log(error);
    //   setAppConfigError(error);
    //   return;
    // }
    // if (appConfigFetched) {
    //   console.log(response);
    //   // Set the context.
    //   if (rsp && rsp.config.stream && rsp.config.stream.nextStream) {
    //     updateContext(rsp);
    //   } else {
    //     setAppConfigError('Failed to fetch appconfig.');
    //   }
    // }
  };

  const updateContext = resp => {
    appConfig.setToken(resp.config.token);
    appConfig.setLiveStream(resp.config.stream.link);
    appConfig.setNextStreamDate(resp.config.stream.nextStream);
  };

  return [FetchAppConfig, appConfigFetched, appConfigError];
};
