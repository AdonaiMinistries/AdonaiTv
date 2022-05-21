import {NEXT_STATE, ERROR_STATE} from '../actions/state/type';
import {INIT_STATE} from '../actions/state/type';

const initialState = {
  currentState: INIT_STATE,
  error: nil,
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_STATE:
      return {currentState: state.currentState};

    case ERROR_STATE:
      return {currentState: state.currentState, error: state.error};

    default:
      break;
  }
};

export default stateReducer;
