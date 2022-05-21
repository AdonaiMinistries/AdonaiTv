import React from 'react';
import {useContext} from 'react';
import {AppConfigContext} from '../provider/AppConfigProvider';

export default () => {
  const ctx = useContext(AppConfigContext);

  const setAppConfig = appConfig => {
    ctx.setAppConfig({
      token: appConfig.token,
      liveStream: appConfig.liveStream,
      nextStreamDate: appConfig.nextStreamDate,
    });
  };

  const getAppConfig = () => {
    return ctx.appConfig;
  };

  return [setAppConfig, getAppConfig];
};
