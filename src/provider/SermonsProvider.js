import React, {useState, component} from 'react';
import {http_constants} from '../constants/httpConst';

const SermonsContext = React.createContext();

const SermonsProvider = props => {
  const [sermonsState, setsermonsState] = useState({
    sermons: [],
    next: http_constants.vimeoProjectUrl,
  });

  return (
    <SermonsContext.Provider
      value={{
        sermonsState,
        setsermonsState,
      }}>
      {props.children}
    </SermonsContext.Provider>
  );
};

export {SermonsProvider, SermonsContext};
