import {combineReducers, createStore} from 'redux';
import stateReducer from './redux/reducer/stateReducer';

const rootReducer = combineReducers({
  stateReducer: stateReducer,
});

configureStore = () => createStore(rootReducer);

export default configureStore;
