import {NEXT_STATE, ERROR_STATE} from './type';

export const setNextState = state => {
  {
    type: NEXT_STATE;
    data: state;
  }
};

export const setStateError = error => {
  {
    type: ERROR_STATE;
    data: error;
  }
};
