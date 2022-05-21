import React from 'react';
import {useContext} from 'react';
import {ERROR_STATE} from '../actions/state/type';
import {StateContext} from '../provider/StateProvider';

export default () => {
  const ctx = useContext(StateContext);

  const setAppState = state => {
    ctx.setappState({currentState: state, error: null});
  };

  const setError = error => {
    ctx.seterror({currentState: ERROR_STATE, error: error});
  };

  const getCurrentState = () => {
    return ctx.appState.currentState;
  };

  return [setAppState, setError, getCurrentState];
};
