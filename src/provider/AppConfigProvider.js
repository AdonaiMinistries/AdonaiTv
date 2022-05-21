import React, {useState} from 'react';

const AppConfigContext = React.createContext();

const AppConfigProvider = props => {
  const [appConfig, setAppConfig] = useState({
    token: '',
    liveStream: '',
    nextStreamDate: '',
  });

  return (
    <AppConfigContext.Provider
      value={{
        appConfig,
        setAppConfig,
      }}>
      {props.children}
    </AppConfigContext.Provider>
  );
};

export {AppConfigProvider, AppConfigContext};
