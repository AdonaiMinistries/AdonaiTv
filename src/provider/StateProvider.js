import React, {useReducer} from 'react';
import {INIT_STATE} from '../actions/state/type';

const StateContext = React.createContext();

const initalState = {
  currentState: INIT_STATE,
  error: '',
  appconfig: {
    token: '',
    liveStream: '',
    nextStreamDate: '',
  },
  sermons: {
    list: {},
    nextpage: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UpdateState':
      return {
        currentState: action.state,
        error: '',
        appconfig: state.appconfig,
        sermons: state.sermons,
      };
    case 'UpdateErrorState':
      return {
        currentState: action.state,
        error: action.error,
        appconfig: nil,
        sermons: nil,
      };
    case 'AddAppConfig':
      return {
        currentState: state.currentState,
        error: '',
        appconfig: action.appconfig,
        sermons: state.sermons,
      };
    case 'AddSermons':
      /**
       * Store existing list into tmpMap
       * Loop through new list of sermons.
       * Add only those sermons which are not present in the list.
       */

      if (state.sermons.list.size > 0) {
        var tmpMap = new Map(state.sermons.list);
      } else {
        var tmpMap = new Map();
      }

      action.sermons.forEach(item => {
        if (tmpMap.has(item.uri) === false) {
          console.log(item.uri);
          tmpMap.set(item.uri, item);
        }
      });

      return {
        currentState: state.currentState,
        error: '',
        appconfig: state.appconfig,
        sermons: {
          list: new Map(tmpMap),
          nextpage: action.next,
        },
      };
    default:
      break;
  }
};

/*
 ** This contex provides the state of current app.
 */
const StateProvider = props => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {props.children}
    </StateContext.Provider>
  );
};

export {StateProvider, StateContext};
